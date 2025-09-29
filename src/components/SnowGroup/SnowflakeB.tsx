import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../../../public/assets/shaders/two/vertex-shader.glsl?raw';
import fragmentShader from '../../../public/assets/shaders/two/fragment-shader.glsl?raw';

interface Props {
  children?: React.ReactNode;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const SnowflakeB = ({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes } = useGLTF('../public/assets/models/snowflake_11.glb'); 

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

  // Continuous rotation using useFrame
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Update shader uniform with elapsed time
    shaderMaterial.uniforms.uTime.value = time;
    
    // Add the initial rotation prop to the animated rotations
    // Slight back-and-forth rotation on X axis (using sine wave for smooth motion)
    // groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.5) * 0.4;
    groupRef.current.rotation.x = rotation[0] + (-time * 0.3);
    
    // Slight back-and-forth rotation on Y axis (different frequency for variety)
    // groupRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3 + 1) * 0.3;
    groupRef.current.rotation.y = rotation[1] + (-time * 0.3);
    
    // Continuous slow rotation around Z axis
    groupRef.current.rotation.z = rotation[2] + (-time * 0.3);
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {
        Object.values(nodes)
          .filter((n) => n instanceof THREE.Mesh)
          .map((mesh) => (
            <mesh
              key={mesh.uuid}
              geometry={mesh.geometry}
              material={shaderMaterial}
              scale={scale - 0.2}
            />
          ))
      }
    </group>
  )
}

export default SnowflakeB;