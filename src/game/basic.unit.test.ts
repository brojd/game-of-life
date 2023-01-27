/**
 * Any live cell with two or three live neighbours survives.
 * Any dead cell with three live neighbours becomes a live cell.
 * All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 */

import { BasicGameOfLife } from './basic';

describe('Basic Game Of Life - unit tests', () => {
  describe('willBeLive', () => {
    const game = new BasicGameOfLife([
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]);

    it('should return true if is currently live and has 2 neighbours', () => {
      expect(game.willBeLive(true, 2)).toBe(true);
    });

    it('should return true if is currently live and has 3 neighbours', () => {
      expect(game.willBeLive(true, 3)).toBe(true);
    });

    it('should return true if is dead and has 3 neighbours', () => {
      expect(game.willBeLive(false, 3)).toBe(true);
    });

    it('should return false otherwise', () => {
      expect(game.willBeLive(true, 1)).toBe(false);
      expect(game.willBeLive(true, 0)).toBe(false);
      expect(game.willBeLive(true, 4)).toBe(false);
      expect(game.willBeLive(false, 0)).toBe(false);
      expect(game.willBeLive(false, 1)).toBe(false);
      expect(game.willBeLive(false, 2)).toBe(false);
      expect(game.willBeLive(false, 4)).toBe(false);
    });
  });

  describe('calculateNbOfLiveNeighbours', () => {
    const game = new BasicGameOfLife([
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]);

    it('should return correct number of live neighbours', () => {
      expect(game.calculateNbOfLiveNeighbours(0, 0)).toBe(2);
      expect(game.calculateNbOfLiveNeighbours(0, 1)).toBe(3);
      expect(game.calculateNbOfLiveNeighbours(0, 2)).toBe(2);
      expect(game.calculateNbOfLiveNeighbours(1, 0)).toBe(3);
      expect(game.calculateNbOfLiveNeighbours(1, 1)).toBe(3);
      expect(game.calculateNbOfLiveNeighbours(1, 2)).toBe(3);
      expect(game.calculateNbOfLiveNeighbours(2, 1)).toBe(1);
      expect(game.calculateNbOfLiveNeighbours(2, 1)).toBe(1);
      expect(game.calculateNbOfLiveNeighbours(2, 1)).toBe(1);
    });
  });

  describe('getIsCurrentlyLive', () => {
    const game = new BasicGameOfLife([
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]);

    it('should return true if cell is currently live', () => {
      expect(game.getIsCurrentlyLive(0, 0)).toBe(true);
      expect(game.getIsCurrentlyLive(0, 1)).toBe(true);
      expect(game.getIsCurrentlyLive(0, 2)).toBe(true);
      expect(game.getIsCurrentlyLive(1, 1)).toBe(true);
    });
    it('should return false if cell is currently dead', () => {
      expect(game.getIsCurrentlyLive(1, 0)).toBe(false);
      expect(game.getIsCurrentlyLive(1, 2)).toBe(false);
      expect(game.getIsCurrentlyLive(2, 0)).toBe(false);
      expect(game.getIsCurrentlyLive(2, 1)).toBe(false);
      expect(game.getIsCurrentlyLive(2, 2)).toBe(false);
    });
    it('should return false if cell is out of grid', () => {
      expect(game.getIsCurrentlyLive(0, 5)).toBe(false);
      expect(game.getIsCurrentlyLive(-2, 1)).toBe(false);
    });
  });

  describe('calculateNewGrid', () => {
    const game = new BasicGameOfLife([
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]);

    it('should calculate next grid correctly', () => {
      game.calculateNewGrid();

      expect(game.grid).toEqual([
        [1, 1, 1],
        [1, 1, 1],
        [0, 0, 0],
      ]);
    });
  });
});
