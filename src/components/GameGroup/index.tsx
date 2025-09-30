import { forwardRef, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import Square from "./Square";
import { getHexagonVertices } from '../../../utilities/calculator';

interface Props {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  children?: React.ReactNode;
}

const GameGroup = forwardRef<THREE.Group, Props>(({ position, rotation, scale, children }, ref) => {


  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Square position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={2.0} /> 
      {children}
    </group>
  )
});

export default GameGroup;