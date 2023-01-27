import { useEffect, useRef } from 'react';
import { BasicGameOfLife } from './game/basic';

const CELL_SIZE = 100;
const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 650;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGridOnCanvas = (grid: BasicGameOfLife['grid']) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          ctx.fillStyle = grid[r][c] ? '#000' : '#fff';
          ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  };

  useEffect(() => {
    const game = new BasicGameOfLife(
      [
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      2000,
      drawGridOnCanvas
    );
    game.start();
    return () => game.destroyTimer();
  }, []);

  return (
    <canvas
      id="world"
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="canvas"
    />
  );
}

export default App;
