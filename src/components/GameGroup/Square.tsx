import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { type ThreeEvent, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../../../public/assets/shaders/four/vertex-shader.glsl?raw';
import fragmentShader from '../../../public/assets/shaders/four/fragment-shader.glsl?raw';

interface Props {
  children?: React.ReactNode;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  // Start animating towards targetPosition when true
  isStarted?: boolean;
  // Where to end up; only Y changes in the current behavior
  targetPosition?: [number, number, number];
  // Units per second to move the Y position
  speed?: number;
  // Called when the snowflake is left-clicked (or tapped on touch)
  onLeftClick?: () => void;
}

const Square = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isStarted = false,
  targetPosition = [0, 4, 0],
  speed = 1.5,
  onLeftClick,
}: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes } = useGLTF('/assets/models/square_1.glb'); 

  // Create custom shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uOffset: { value: Math.random() * 2.0 }
    },
    side: THREE.DoubleSide, // Render both front and back faces
  });

  // Dispose material on unmount to avoid GPU leaks when removing Squares
  useEffect(() => {
    return () => {
      shaderMaterial.dispose();
    };
  }, [shaderMaterial]);

  // Per-frame updates (shader time + optional movement)
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Update shader uniform with elapsed time
    shaderMaterial.uniforms.uTime.value = time;
    
    // Add the initial rotation prop to the animated rotations
    // Slight back-and-forth rotation on X axis (using sine wave for smooth motion)
    // groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.5) * 0.4;
    // groupRef.current.rotation.x = rotation[0] + (-time * 0.3);
    
    // Slight back-and-forth rotation on Y axis (different frequency for variety)
    // groupRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3 + 1) * 0.3;
    // groupRef.current.rotation.y = rotation[1] + (-time * 0.3);
    
    // Continuous slow rotation around Z axis
    // groupRef.current.rotation.z = rotation[2] + (-time * 0.3);

    // If started, move down toward the target Y at a fixed speed (units/second)
    if (isStarted) {
      const currentY = groupRef.current.position.y;
      const targetY = targetPosition[1];
      if (currentY > targetY) {
        // Move downward by speed * delta, but don't overshoot the target
        const nextY = Math.max(targetY, currentY - speed * delta);
        groupRef.current.position.set(
          groupRef.current.position.x,
          nextY,
          groupRef.current.position.z
        );
      }
    }
  });

  // When not started (e.g., after reset), sync the group position to the provided prop
  useEffect(() => {
    if (!groupRef.current) return;
    if (!isStarted) {
      groupRef.current.position.set(position[0], position[1], position[2]);
    }
  }, [isStarted, position]);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {
        Object.values(nodes)
          .filter((n) => n instanceof THREE.Mesh)
          .map((mesh) => (
            <mesh
              key={mesh.uuid}
              geometry={mesh.geometry}
              material={shaderMaterial}
              scale={scale}
              onPointerDown={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation();
                if (e.button === 0 || e.pointerType !== 'mouse') {
                  onLeftClick?.();
                }
              }}
            />
          ))
      }
    </group>
  )
}

export default Square;