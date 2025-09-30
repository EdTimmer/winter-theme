import '../../App.css';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import Square from './Square';
import Circle from './Circle';
import Triangle from './Triangle';
import { useMemo, useState } from 'react';

const GameGroupWrapper = () => {
  const [started, setStarted] = useState(false);
  const [startY, setStartY] = useState(18.5); // initial Y before dropping
  const [count, setCount] = useState(0);

  type ShapeType = 'square' | 'circle' | 'triangle';
  interface RowItem {
    isClockwiseRotation: any; id: string; type: ShapeType; x: number; 
  }
  interface Row { id: string; yOffset: number; items: RowItem[], isClockwiseRotation?: boolean }

  // Random X offset function to avoid perfect alignment in X from -0.4 to +0.4
  const randomOffsetX = () => (Math.random() * 0.8) - 0.4;
  const randomOffsetY = () => (Math.random() * 0.6) - 0.3;

  // Build three rows with mixed shapes at x positions -4,-2,0,2,4
  const initialRows: Row[] = useMemo(() => ([
    {
      id: 'row-0',
      yOffset: 0,
      items: [
        { id: 'r0-0', type: 'square', x: -4 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r0-1', type: 'circle', x: -2 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r0-2', type: 'triangle', x: 0. + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r0-3', type: 'square', x: 2 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r0-4', type: 'circle', x: 4 + randomOffsetX(), isClockwiseRotation: false },
      ],
    },
    {
      id: 'row-1',
      yOffset: -1.5,
      items: [
        { id: 'r1-0', type: 'triangle', x: -4 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r1-1', type: 'square', x: -2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r1-2', type: 'circle', x: 0 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r1-3', type: 'triangle', x: 2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r1-4', type: 'square', x: 4 + randomOffsetX(), isClockwiseRotation: false },
      ],
    },
    {
      id: 'row-2',
      yOffset: -3,
      items: [
        { id: 'r2-0', type: 'circle', x: -4 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r2-1', type: 'triangle', x: -2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r2-2', type: 'square', x: 0 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r2-3', type: 'circle', x: 2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r2-4', type: 'triangle', x: 4 + randomOffsetX(), isClockwiseRotation: false },
      ],
    },
    {
      id: 'row-3',
      yOffset: -4.5,
      items: [
        { id: 'r0-0', type: 'square', x: -4 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r0-1', type: 'circle', x: -2 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r0-2', type: 'triangle', x: 0. + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r0-3', type: 'square', x: 2 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r0-4', type: 'circle', x: 4 + randomOffsetX(), isClockwiseRotation: false },
      ],
    },
    {
      id: 'row-4',
      yOffset: -6,
      items: [
        { id: 'r1-0', type: 'triangle', x: -4 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r1-1', type: 'square', x: -2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r1-2', type: 'circle', x: 0 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r1-3', type: 'triangle', x: 2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r1-4', type: 'square', x: 4 + randomOffsetX(), isClockwiseRotation: false },
      ],
    },
    {
      id: 'row-5',
      yOffset: -7.5,
      items: [
        { id: 'r2-0', type: 'circle', x: -4 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r2-1', type: 'triangle', x: -2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r2-2', type: 'square', x: 0 + randomOffsetX(), isClockwiseRotation: false },
        { id: 'r2-3', type: 'circle', x: 2 + randomOffsetX(), isClockwiseRotation: true },
        { id: 'r2-4', type: 'triangle', x: 4 + randomOffsetX(), isClockwiseRotation: false },
      ],
    },
  ]), []);

  const [rows, setRows] = useState<Row[]>(initialRows);

  const handleStart = () => {
    setStarted(true);
  };

  const handleReset = () => {
    setStarted(false);
    setStartY(18.5); // reset to initial height
    setCount(0); // reset counter
    setRows(initialRows); // restore all rows/items
  };

  const handleRemove = (rowId: string, itemId: string) => {
    setRows((prev) => prev.map((row) => (
      row.id === rowId
        ? { ...row, items: row.items.filter((it) => it.id !== itemId) }
        : row
    )));
    setCount((c) => c + 1);
  };
  return (
    <div className="drop-container">
      <div className='scene-two-container'>
        <Canvas>
          <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} near={0.1} far={100} />
          {/* Camera will automatically look at the center [0,0,0] when using Canvas camera prop */}

          {rows.flatMap((row) => (
            row.items.map((it) => {
              const commonProps = {
                key: `${row.id}-${it.id}`,
                position: [it.x, startY + row.yOffset, 0] as [number, number, number],
                rotation: [0, 0, 0] as [number, number, number],
                scale: 0.5,
                isStarted: started,
                targetPosition: [it.x, -8 + randomOffsetY(), 0] as [number, number, number],
                speed: 1.5,
                isClockwiseRotation: it.isClockwiseRotation,
              };
              const onClick = () => handleRemove(row.id, it.id);
              if (it.type === 'square') return <Square {...commonProps} onLeftClick={onClick} />;
              if (it.type === 'circle') return <Circle {...commonProps} onLeftClick={onClick} />;
              return <Triangle {...commonProps} onLeftClick={onClick} />;
            })
          ))}

          <ambientLight intensity={0.5} />
          {/* <OrbitControls enableZoom={true} /> */}
        </Canvas>
      </div>
      <button className='start-button' onClick={handleStart}>Start Game</button>
      <button className='reset-button' onClick={handleReset}>Reset Game</button>
      <div className='counter-container'>{count}</div>
    </div>
  );
}

export default GameGroupWrapper;