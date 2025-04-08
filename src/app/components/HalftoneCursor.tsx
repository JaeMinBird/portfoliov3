'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Simplified DotPosition interface
interface DotPosition {
  x: number;
  y: number;
  opacity: number;
  size: number;
  distanceFromCursor: number;
  isTrailDot: boolean;
  creationTime: number;
  initialOpacity: number;
  velocityFactor: number;
  isFading: boolean;
}

interface CursorState {
  position: { x: number; y: number };
  isVisible: boolean;
  trail: DotPosition[];
  lastMoveTime: number;
}

export default function HalftoneCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    position: { x: 0, y: 0 },
    isVisible: false,
    trail: [],
    lastMoveTime: Date.now()
  });
  
  // Optimized configuration
  const radius = 15;
  const innerRadius = 8;
  const gridSize = 6;
  const decayRate = 0.008;
  const trailDecayRate = 0.0015;
  const fastDecayRate = 0.05;
  const maxDots = 150;         // Reduced max dots for better performance
  const throttleMs = 16;
  
  const requestRef = useRef<number | undefined>(undefined);
  const throttleRef = useRef<number | null>(null);
  const speedRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const previousPositionsRef = useRef<{x: number, y: number, time: number}[]>([]);
  
  // Generate trail dots that follow the cursor path
  const generateTrailDots = useCallback((prevPositions: {x: number, y: number, time: number}[], currentTime: number) => {
    if (prevPositions.length < 2) return [];
    
    const trailDots: DotPosition[] = [];
    const positions = [...prevPositions];
    
    // Only use recent positions (last 300ms) for trail
    const recentPositions = positions.filter(pos => currentTime - pos.time < 300);
    if (recentPositions.length < 2) return [];
    
    // Process pairs of positions to create line segments
    for (let i = 1; i < recentPositions.length; i++) {
      const prevPos = recentPositions[i-1];
      const currPos = recentPositions[i];
      
      // Calculate segment properties
      const dx = currPos.x - prevPos.x;
      const dy = currPos.y - prevPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 3) continue; // Skip smaller segments
      
      // Calculate time-based properties
      const timeDiff = currPos.time - prevPos.time;
      const speed = distance / Math.max(1, timeDiff);
      
      // Add fewer dots for trail - just enough for continuity
      const dotCount = Math.min(3, Math.max(1, Math.floor(distance / 10)));
      
      // Add dots along the segment
      for (let j = 0; j < dotCount; j++) {
        const t = j / dotCount;
        const x = prevPos.x + dx * t;
        const y = prevPos.y + dy * t;
        
        // Calculate how new this segment is
        const segmentAge = currentTime - currPos.time;
        // Short-lived emphasis for newer segments
        const ageFactor = Math.max(0, 1 - segmentAge / 300);
        
        trailDots.push({
          x,
          y,
          opacity: 0.4 * (ageFactor + 0.2),
          size: 1.2,
          distanceFromCursor: Math.sqrt(
            (x - currPos.x) * (x - currPos.x) + 
            (y - currPos.y) * (y - currPos.y)
          ),
          isTrailDot: true,
          creationTime: currentTime,
          initialOpacity: 0.4 * (ageFactor + 0.2),
          velocityFactor: speed * 0.05,
          isFading: false
        });
      }
    }
    
    return trailDots;
  }, []);
  
  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (throttleRef.current !== null) return;
    
    const currentTime = Date.now();
    
    // Calculate cursor speed
    const currentSpeed = {
      x: e.clientX - lastPositionRef.current.x,
      y: e.clientY - lastPositionRef.current.y
    };
    
    // Update last position
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
    
    // Track previous positions for trail effect
    previousPositionsRef.current.push({ 
      x: e.clientX, 
      y: e.clientY,
      time: currentTime
    });
    
    // Keep positions for trail
    if (previousPositionsRef.current.length > 15) {
      previousPositionsRef.current.shift();
    }
    
    // Smooth speed calculation
    speedRef.current = {
      x: speedRef.current.x * 0.8 + currentSpeed.x * 0.2,
      y: speedRef.current.y * 0.8 + currentSpeed.y * 0.2
    };
    
    // Throttle updates
    throttleRef.current = window.setTimeout(() => {
      throttleRef.current = null;
    }, throttleMs);
    
    setCursorState(prev => {
      // Mark trail dots as fading when starting to move
      const markedTrail = prev.trail.map(dot => ({
        ...dot,
        isFading: dot.isTrailDot ? true : dot.isFading
      }));
      
      // Create new pattern dots
      const newDots: DotPosition[] = [];
      
      // Adjust radius based on speed
      const speedMagnitude = Math.sqrt(
        speedRef.current.x * speedRef.current.x + 
        speedRef.current.y * speedRef.current.y
      );
      
      // Dynamic radius adjustment - gets smaller with faster movement
      const dynamicRadius = Math.max(6, radius - Math.min(speedMagnitude * 0.1, 8));
      
      // Create gradient effect with two different densities
      // Inner ring - very dense
      for (let xOffset = -innerRadius; xOffset <= innerRadius; xOffset += gridSize/2) {
        for (let yOffset = -innerRadius; yOffset <= innerRadius; yOffset += gridSize/2) {
          const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
          
          if (distance <= innerRadius) {
            // High probability for inner circle dots
            const dotProbability = 0.7 - (distance / innerRadius) * 0.3;
            
            if (Math.random() < dotProbability) {
              const size = Math.max(0.8, 1.5 * (1 - distance / innerRadius));
              
              newDots.push({
                x: e.clientX + xOffset,
                y: e.clientY + yOffset,
                opacity: 0.7 - (distance / innerRadius) * 0.2,
                size,
                distanceFromCursor: distance,
                isTrailDot: false,
                creationTime: currentTime,
                initialOpacity: 0.7 - (distance / innerRadius) * 0.2,
                velocityFactor: speedMagnitude * 0.01,
                isFading: false
              });
            }
          }
        }
      }
      
      // Outer ring - less dense, creates gradual thinning
      for (let xOffset = -dynamicRadius; xOffset <= dynamicRadius; xOffset += gridSize) {
        for (let yOffset = -dynamicRadius; yOffset <= dynamicRadius; yOffset += gridSize) {
          const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
          
          // Only in the outer ring (between innerRadius and dynamicRadius)
          if (distance > innerRadius && distance <= dynamicRadius) {
            // Probability decreases as we move outward - creating gradient effect
            const gradientFactor = 1 - ((distance - innerRadius) / (dynamicRadius - innerRadius));
            const dotProbability = 0.5 * gradientFactor * Math.max(0.2, 1 - speedMagnitude * 0.01);
            
            if (Math.random() < dotProbability) {
              const size = Math.max(0.6, 1.2 * gradientFactor);
              
              newDots.push({
                x: e.clientX + xOffset,
                y: e.clientY + yOffset,
                opacity: 0.6 * gradientFactor,
                size,
                distanceFromCursor: distance,
                isTrailDot: false,
                creationTime: currentTime,
                initialOpacity: 0.6 * gradientFactor,
                velocityFactor: speedMagnitude * 0.01,
                isFading: false
              });
            }
          }
        }
      }
      
      // Generate trail dots along the path
      const trailDots = generateTrailDots(previousPositionsRef.current, currentTime);
      
      // Combine all dots - keeping the filtered ones
      const currentTrail = [
        ...markedTrail.filter(dot => dot.opacity > 0.01), // Keep visible dots
        ...newDots,
        ...trailDots
      ];
      
      // Keep only the most recent dots
      const limitedTrail = currentTrail.length > maxDots 
        ? currentTrail.slice(currentTrail.length - maxDots) 
        : currentTrail;
      
      return {
        position: { x: e.clientX, y: e.clientY },
        isVisible: true,
        trail: limitedTrail,
        lastMoveTime: currentTime
      };
    });
  }, [generateTrailDots]);
  
  const handleMouseLeave = useCallback(() => {
    setCursorState(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);
  
  // Animation loop to decay dots
  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now();
      
      setCursorState(prev => {
        const isIdle = currentTime - prev.lastMoveTime > 1000;
        
        return {
          ...prev,
          trail: prev.trail.map(dot => {
            // Fast decay for fading trail dots or during idle
            if ((dot.isTrailDot && dot.isFading) || isIdle) {
              return {
                ...dot,
                opacity: dot.opacity > 0 ? dot.opacity - fastDecayRate : 0,
                size: dot.size * 0.97
              };
            }
            
            // Regular decay
            const age = currentTime - dot.creationTime;
            const ageFactor = Math.min(1, age / 1000);
            
            let fadeRate;
            if (dot.isTrailDot) {
              fadeRate = trailDecayRate * (1 + ageFactor * 2);
            } else {
              fadeRate = decayRate * (1 + dot.distanceFromCursor * 0.01) * (1 + ageFactor);
            }
            
            return {
              ...dot,
              size: dot.size * (dot.isTrailDot ? 0.999 : 0.995),
              opacity: dot.opacity > 0 
                ? dot.opacity - fadeRate
                : 0,
            };
          }).filter(dot => dot.opacity > 0.01)
        };
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);
  
  return (
    <div className="cursor-container">
      {cursorState.trail.map((dot, i) => (
        <div
          key={i}
          className="halftone-dot"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            opacity: dot.opacity,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: 'black',
            transform: `translate(-50%, -50%) ${dot.isTrailDot ? '' : 'rotate(' + (i % 3) * 45 + 'deg)'}`
          }}
        />
      ))}
    </div>
  );
}