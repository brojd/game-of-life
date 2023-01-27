/**
 * Any live cell with two or three live neighbours survives.
 * Any dead cell with three live neighbours becomes a live cell.
 * All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 */

import { BasicGameOfLife } from './basic';

describe('Game of life - basic', () => {
  it('should calculate new grid correctly on every interval tick', () => {
    jest.useFakeTimers();
    const INTERVAL = 1000;

    const game = new BasicGameOfLife(
      [
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ],
      INTERVAL
    );
    game.start();

    expect(game.grid).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
    ]);

    jest.advanceTimersByTime(1000);
    expect(game.grid).toEqual([
      [1, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    jest.advanceTimersByTime(1000);
    expect(game.grid).toEqual([
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    jest.advanceTimersByTime(1000);
    expect(game.grid).toEqual([
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
