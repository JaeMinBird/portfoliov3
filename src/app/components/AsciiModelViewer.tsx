'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

interface AsciiModelViewerProps {
  modelPath: string;
  className?: string;
}

export default function AsciiModelViewer({ 
  modelPath,
  className = '',
}: AsciiModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const asciiEffectRef = useRef<AsciiEffect | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const initialScrollY = useRef<number>(0);
  const baseRotationY = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const initialCameraZ = useRef<number>(8); // Start further away
  const targetCameraZ = useRef<number>(3); // Zoom in target

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    cameraRef.current = camera;
    camera.position.z = initialCameraZ.current;
    camera.position.y = 0.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    
    // ASCII effect - inverted so only the model shows in ASCII
    const asciiEffect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: false, resolution: 0.2 });
    asciiEffectRef.current = asciiEffect;
    asciiEffect.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    asciiEffect.domElement.style.color = 'white';
    asciiEffect.domElement.style.backgroundColor = 'transparent';
    asciiEffect.domElement.style.position = 'absolute';
    asciiEffect.domElement.style.left = '0';
    asciiEffect.domElement.style.top = '0';
    asciiEffect.domElement.style.width = '100%';
    asciiEffect.domElement.style.height = '100%';
    asciiEffect.domElement.style.zIndex = '1';
    containerRef.current.appendChild(asciiEffect.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim; // Start with smaller scale
        model.scale.set(scale, scale, scale);
        
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale; // Center vertically
        model.position.z = -center.z * scale;
        
        // Set initial rotation
        model.rotation.x = 0.1;
        model.rotation.y = Math.PI / 6;
        baseRotationY.current = model.rotation.y;
        
        scene.add(model);
        setIsLoaded(true);
      },
      (xhr) => {
        // Progress callback
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Store initial scroll position
    initialScrollY.current = window.scrollY;

    // Function to check if element is in viewport
    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Calculate how far into the viewport the element is (0-1)
      // 0 = just entering, 1 = fully in viewport
      const visibleRatio = Math.min(
        Math.max(
          (windowHeight - Math.max(0, rect.top)) / rect.height,
          0
        ),
        1
      );
      
      return visibleRatio;
    };

    // Animation loop
    const animate = () => {
      if (modelRef.current && isLoaded) {
        // Add a subtle continuous rotation
        modelRef.current.rotation.y += 0.001;
      }
      
      // Update camera position based on scroll
      if (containerRef.current && cameraRef.current) {
        const visibleRatio = isInViewport(containerRef.current);
        
        // Interpolate camera position based on visibility
        const targetZ = initialCameraZ.current - 
          (visibleRatio * (initialCameraZ.current - targetCameraZ.current));
        
        // Smooth camera movement
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
      }
      
      if (asciiEffectRef.current && cameraRef.current && sceneRef.current) {
        asciiEffectRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle scroll to rotate the model
    const handleScroll = () => {
      if (modelRef.current) {
        const scrollDelta = window.scrollY - initialScrollY.current;
        modelRef.current.rotation.y = baseRotationY.current + (scrollDelta * 0.002);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !asciiEffectRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
      asciiEffectRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && asciiEffectRef.current) {
        containerRef.current.removeChild(asciiEffectRef.current.domElement);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      rendererRef.current?.dispose();
    };
  }, [modelPath]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{ position: 'relative' }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading model...
        </div>
      )}
    </div>
  );
}