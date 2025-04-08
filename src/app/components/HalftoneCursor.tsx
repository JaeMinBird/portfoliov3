'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Simplified DotPosition interface
interface DotPosition {
  x: number;
  y: number;
  opacity: number;
  size: number;
  distanceFromCursor: number;
  isTrailDot: boolean;
  creationTime: number;
  isFading: boolean;
}

interface CursorState {
  isVisible: boolean;
  trail: DotPosition[];
  lastMoveTime: number;
}

export default function HalftoneCursor() {
  // Optimized configuration - memoized to prevent recreation
  const config = useMemo(() => ({
    radius: 15,
    innerRadius: 8,
    gridSize: 6,
    decayRate: 0.008,
    trailDecayRate: 0.0015,
    fastDecayRate: 0.05,
    maxDots: 120,
    throttleMs: 16
  }), []);
  
  // Use refs for values that don't need to trigger re-renders
  const cursorStateRef = useRef<CursorState>({
    isVisible: false,
    trail: [],
    lastMoveTime: Date.now()
  });
  
  // Only use state for values that affect rendering
  const [trail, setTrail] = useState<DotPosition[]>([]);
  
  const requestRef = useRef<number | undefined>(undefined);
  const throttleRef = useRef<number | null>(null);
  const speedRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const previousPositionsRef = useRef<{x: number, y: number, time: number}[]>([]);
  
  // Generate trail dots that follow the cursor path
  const generateTrailDots = useCallback((prevPositions: {x: number, y: number, time: number}[], currentTime: number) => {
    if (prevPositions.length < 2) return [];
    
    const trailDots: DotPosition[] = [];
    
    // Only use recent positions (last 300ms)
    const recentPositions = prevPositions.filter(pos => currentTime - pos.time < 300);
    if (recentPositions.length < 2) return [];
    
    // Process pairs of positions to create line segments
    for (let i = 1; i < recentPositions.length; i++) {
      const prevPos = recentPositions[i-1];
      const currPos = recentPositions[i];
      
      const dx = currPos.x - prevPos.x;
      const dy = currPos.y - prevPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 3) continue; // Skip smaller segments
      
      // Add fewer dots for trail - optimized for performance
      const dotCount = Math.min(2, Math.max(1, Math.floor(distance / 15)));
      
      for (let j = 0; j < dotCount; j++) {
        const t = j / dotCount;
        const x = prevPos.x + dx * t;
        const y = prevPos.y + dy * t;
        
        // Calculate age factor
        const segmentAge = currentTime - currPos.time;
        const ageFactor = Math.max(0, 1 - segmentAge / 300);
        
        const opacity = 0.4 * (ageFactor + 0.2);
        
        trailDots.push({
          x,
          y,
          opacity,
          size: 1.2,
          distanceFromCursor: Math.sqrt(
            (x - currPos.x) * (x - currPos.x) + 
            (y - currPos.y) * (y - currPos.y)
          ),
          isTrailDot: true,
          creationTime: currentTime,
          isFading: false
        });
      }
    }
    
    return trailDots;
  }, []);
  
  // Process cursor state updates
  const updateCursorState = useCallback((clientX: number, clientY: number) => {
    const currentTime = Date.now();
    const { maxDots } = config;
    
    // Calculate cursor speed
    const currentSpeed = {
      x: clientX - lastPositionRef.current.x,
      y: clientY - lastPositionRef.current.y
    };
    
    // Update last position
    lastPositionRef.current = { x: clientX, y: clientY };
    
    // Track previous positions for trail effect
    previousPositionsRef.current.push({ 
      x: clientX, 
      y: clientY,
      time: currentTime
    });
    
    // Keep positions for trail, limit history
    if (previousPositionsRef.current.length > 10) {
      previousPositionsRef.current.shift();
    }
    
    // Smooth speed calculation with exponential moving average
    speedRef.current = {
      x: speedRef.current.x * 0.8 + currentSpeed.x * 0.2,
      y: speedRef.current.y * 0.8 + currentSpeed.y * 0.2
    };
    
    // Current cursor state
    const { trail } = cursorStateRef.current;
    
    // Mark trail dots as fading when starting to move
    const markedTrail = trail.map(dot => ({
      ...dot,
      isFading: dot.isTrailDot ? true : dot.isFading
    }));
    
    // Create new pattern dots
    const newDots: DotPosition[] = [];
    
    // Calculate speed magnitude
    const speedMagnitude = Math.sqrt(
      speedRef.current.x * speedRef.current.x + 
      speedRef.current.y * speedRef.current.y
    );
    
    // Dynamic radius adjustment
    const dynamicRadius = Math.max(6, config.radius - Math.min(speedMagnitude * 0.1, 8));
    
    // Create inner ring dots
    for (let xOffset = -config.innerRadius; xOffset <= config.innerRadius; xOffset += config.gridSize/2) {
      for (let yOffset = -config.innerRadius; yOffset <= config.innerRadius; yOffset += config.gridSize/2) {
        const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
        
        if (distance <= config.innerRadius) {
          const dotProbability = 0.6 - (distance / config.innerRadius) * 0.3;
          
          if (Math.random() < dotProbability) {
            const size = Math.max(0.8, 1.5 * (1 - distance / config.innerRadius));
            const opacity = 0.7 - (distance / config.innerRadius) * 0.2;
            
            newDots.push({
              x: clientX + xOffset,
              y: clientY + yOffset,
              opacity,
              size,
              distanceFromCursor: distance,
              isTrailDot: false,
              creationTime: currentTime,
              isFading: false
            });
          }
        }
      }
    }
    
    // Create outer ring dots
    const outerGridStep = config.gridSize * 1.5;
    for (let xOffset = -dynamicRadius; xOffset <= dynamicRadius; xOffset += outerGridStep) {
      for (let yOffset = -dynamicRadius; yOffset <= dynamicRadius; yOffset += outerGridStep) {
        const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
        
        if (distance > config.innerRadius && distance <= dynamicRadius) {
          const gradientFactor = 1 - ((distance - config.innerRadius) / (dynamicRadius - config.innerRadius));
          const dotProbability = 0.4 * gradientFactor * Math.max(0.2, 1 - speedMagnitude * 0.01);
          
          if (Math.random() < dotProbability) {
            const size = Math.max(0.6, 1.2 * gradientFactor);
            
            newDots.push({
              x: clientX + xOffset,
              y: clientY + yOffset,
              opacity: 0.6 * gradientFactor,
              size,
              distanceFromCursor: distance,
              isTrailDot: false,
              creationTime: currentTime,
              isFading: false
            });
          }
        }
      }
    }
    
    // Generate trail dots along the path
    const trailDots = generateTrailDots(previousPositionsRef.current, currentTime);
    
    // Combine all dots
    const currentTrail = [
      ...markedTrail.filter(dot => dot.opacity > 0.01),
      ...newDots,
      ...trailDots
    ];
    
    // Keep only the most recent dots
    const limitedTrail = currentTrail.length > maxDots 
      ? currentTrail.slice(currentTrail.length - maxDots) 
      : currentTrail;
    
    // Update ref directly
    cursorStateRef.current = {
      isVisible: true,
      trail: limitedTrail,
      lastMoveTime: currentTime
    };
    
    // Only update the state that affects rendering
    setTrail(limitedTrail);
  }, [config, generateTrailDots]);
  
  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (throttleRef.current !== null) return;
    
    // Throttle updates
    throttleRef.current = window.setTimeout(() => {
      throttleRef.current = null;
    }, config.throttleMs);
    
    updateCursorState(e.clientX, e.clientY);
  }, [config.throttleMs, updateCursorState]);
  
  const handleMouseLeave = useCallback(() => {
    cursorStateRef.current.isVisible = false;
  }, []);
  
  // Animation loop for dot decay
  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now();
      const { trail, lastMoveTime } = cursorStateRef.current;
      const { decayRate, trailDecayRate, fastDecayRate } = config;
      
      const isIdle = currentTime - lastMoveTime > 1000;
      
      // Only update state if there are dots to animate
      if (trail.length > 0) {
        const updatedTrail = trail.filter(dot => {
          // Fast decay for fading trail dots or during idle
          if ((dot.isTrailDot && dot.isFading) || isIdle) {
            dot.opacity = dot.opacity > 0 ? dot.opacity - fastDecayRate : 0;
            dot.size = dot.size * 0.97;
          } else {
            // Regular decay
            const age = currentTime - dot.creationTime;
            const ageFactor = Math.min(1, age / 1000);
            
            const fadeRate = dot.isTrailDot
              ? trailDecayRate * (1 + ageFactor * 2)
              : decayRate * (1 + dot.distanceFromCursor * 0.01) * (1 + ageFactor);
            
            dot.size = dot.size * (dot.isTrailDot ? 0.999 : 0.995);
            dot.opacity = dot.opacity > 0 ? dot.opacity - fadeRate : 0;
          }
          
          return dot.opacity > 0.01; // Keep only visible dots
        });
        
        cursorStateRef.current.trail = updatedTrail;
        setTrail(updatedTrail);
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [config]);
  
  // Set up event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);
  
  // Memoized dot style
  const dotStyle = useMemo(() => ({
    position: 'fixed' as const,
    borderRadius: '50%',
    pointerEvents: 'none' as const,
    zIndex: 9999
  }), []);
  
  return (
    <>
      {trail.map((dot, i) => (
        <div
          key={`dot-${i}`}
          style={{
            ...dotStyle,
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
    </>
  );
}