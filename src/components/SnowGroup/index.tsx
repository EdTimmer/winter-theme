import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import Snowflake from "./Snowflake";
import { getHexagonVertices } from '../../../utilities/calculator';
interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  count: number;
  rotationSpeed?: number;
  children?: React.ReactNode;
}

const SnowGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, count, rotationSpeed = 1, children }, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const groupRef = (ref as React.RefObject<THREE.Group>) || localRef;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += rotationSpeed * delta;
    }
  });

  const hexPositions = getHexagonVertices(200);
  console.log('hexPositions[0] :>> ', hexPositions[0]);

  // Function to get a random number between -12 and 12
  const getRandomOffset = () => (Math.random() * 24) - 12;

  // get random number from array of [-12, -10, -8, 8, 10, 12]
  const getRandomHexOffset = () => {
    const offsets = [-12, -10, -8, 8, 10, 12];
    return offsets[Math.floor(Math.random() * offsets.length)];
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Snowflake position={hexPositions[0]} rotation={[0, 0, 0]} scale={1.4} />
      <Snowflake position={[hexPositions[0][0] + getRandomHexOffset(), hexPositions[0][1] + getRandomHexOffset(), hexPositions[0][2] + getRandomHexOffset()]} rotation={[0, 0, 3]} scale={1.5} />
      <Snowflake position={hexPositions[1]} rotation={[0, 0, 1]} scale={1.4} />
      <Snowflake position={[hexPositions[1][0] + getRandomHexOffset(), hexPositions[1][1] + getRandomHexOffset(), hexPositions[1][2] + getRandomHexOffset()]} rotation={[0, 0, 4]} scale={1.3} />
      <Snowflake position={hexPositions[2]} rotation={[0, 0, 3]} scale={1.4} />
      <Snowflake position={[hexPositions[2][0] + getRandomHexOffset(), hexPositions[2][1] + getRandomHexOffset(), hexPositions[2][2] + getRandomHexOffset()]} rotation={[0, 0, 0]} scale={1.5} />
      <Snowflake position={hexPositions[3]} rotation={[0, 0, 2]} scale={1.4} />
      <Snowflake position={[hexPositions[3][0] + getRandomHexOffset(), hexPositions[3][1] + getRandomHexOffset(), hexPositions[3][2] + getRandomHexOffset()]} rotation={[0, 0, 4]} scale={1.3} />
      <Snowflake position={hexPositions[4]} rotation={[0, 0, 1]} scale={1.4} />
      <Snowflake position={[hexPositions[4][0] + getRandomHexOffset(), hexPositions[4][1] + getRandomHexOffset(), hexPositions[4][2] + getRandomHexOffset()]} rotation={[0, 0, 3]} scale={1.5} />
      <Snowflake position={hexPositions[5]} rotation={[0, 0, 2.5]} scale={1.4} />
      <Snowflake position={[hexPositions[5][0] + getRandomHexOffset(), hexPositions[5][1] + getRandomHexOffset(), hexPositions[5][2] + getRandomHexOffset()]} rotation={[0, 0, 0]} scale={1.3} />

      {count >= 1 && (
        <group position={[0, 0, 20]} rotation={[0, 0, Math.PI / 6]} >
          <Snowflake position={[hexPositions[0][0] + getRandomOffset(), hexPositions[0][1] + getRandomOffset(), hexPositions[0][2] + getRandomOffset()]} rotation={[0, 0, 2]} scale={1.4} />
          <Snowflake position={[hexPositions[1][0] + getRandomOffset(), hexPositions[1][1] + getRandomOffset(), hexPositions[1][2] + getRandomOffset()]} rotation={[0, 0, 0]} scale={1.4} />
          <Snowflake position={[hexPositions[2][0] + getRandomOffset(), hexPositions[2][1] + getRandomOffset(), hexPositions[2][2] + getRandomOffset()]} rotation={[0, 0, 1]} scale={1.4} />
          <Snowflake position={[hexPositions[3][0] + getRandomOffset(), hexPositions[3][1] + getRandomOffset(), hexPositions[3][2] + getRandomOffset()]} rotation={[0, 0, 3]} scale={1.4} />
          <Snowflake position={[hexPositions[4][0] + getRandomOffset(), hexPositions[4][1] + getRandomOffset(), hexPositions[4][2] + getRandomOffset()]} rotation={[0, 0, 0]} scale={1.4} />
          <Snowflake position={[hexPositions[5][0] + getRandomOffset(), hexPositions[5][1] + getRandomOffset(), hexPositions[5][2] + getRandomOffset()]} rotation={[0, 0, 4]} scale={1.4} />
        </group>
        )
      }

      {count >= 2 && (
        <group>
        <group position={[0, 0, -20]} rotation={[0, 0, Math.PI / 6]}>
          <Snowflake position={hexPositions[0]} rotation={[0, 0, 4]} scale={1.4} />
          <Snowflake position={hexPositions[1]} rotation={[0, 0, 3]} scale={1.4} />
          <Snowflake position={hexPositions[2]} rotation={[0, 0, 4]} scale={1.4} />
          <Snowflake position={hexPositions[3]} rotation={[0, 0, 0]} scale={1.4} />
          <Snowflake position={hexPositions[4]} rotation={[0, 0, 2]} scale={1.4} />
          <Snowflake position={hexPositions[5]} rotation={[0, 0, 0]} scale={1.4} />
        </group>

        <group position={[0.2, 0.2, 0]} rotation={[0.2, 0.2, Math.PI / 6]}>
          <Snowflake position={hexPositions[0]} rotation={[0, 0, 0]} scale={1.2} />
          <Snowflake position={hexPositions[1]} rotation={[0, 0, 1]} scale={1.6} />
          <Snowflake position={hexPositions[2]} rotation={[0, 0, 4]} scale={1.2} />
          <Snowflake position={hexPositions[3]} rotation={[0, 0, 0]} scale={1.6} />
          <Snowflake position={hexPositions[4]} rotation={[0, 0, 4]} scale={1.2} />
          <Snowflake position={hexPositions[5]} rotation={[0, 0, 2]} scale={1.6} />
        </group>
        </group>
        )
      }
      {children}
    </group>
  )
});

export default SnowGroup;