/**
 * Any live cell with two or three live neighbours survives.
 * Any dead cell with three live neighbours becomes a live cell.
 * All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 */

export class BasicGameOfLife {
  grid: (0 | 1)[][];
  interval: number = 0;
  afterGridChangeCallback: (grid: (0 | 1)[][]) => void;
  timer?: NodeJS.Timer;

  constructor(
    initGrid: (0 | 1)[][],
    interval: number = 1000,
    afterGridChangeCallback: (grid: (0 | 1)[][]) => void = () => {}
  ) {
    this.grid = initGrid;
    this.interval = interval;
    this.afterGridChangeCallback = afterGridChangeCallback;
  }

  calculateNewGrid() {
    const newGrid = JSON.parse(JSON.stringify(this.grid));
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        const nbOfNeighbours = this.calculateNbOfLiveNeighbours(r, c);
        const isLive = this.willBeLive(
          Boolean(this.grid[r][c]),
          nbOfNeighbours
        );
        newGrid[r][c] = isLive ? 1 : 0;
      }
    }
    this.grid = newGrid;
    return newGrid;
  }

  getIsCurrentlyLive(r: number, c: number) {
    try {
      return this.grid[r][c] === 1;
    } catch (err) {
      return false;
    }
  }

  calculateNbOfLiveNeighbours(r: number, c: number) {
    return [
      [r - 1, c - 1],
      [r - 1, c],
      [r - 1, c + 1],
      [r, c + 1],
      [r, c - 1],
      [r + 1, c - 1],
      [r + 1, c],
      [r + 1, c + 1],
    ].reduce(
      (nbOfLiveNeighbours, coordinates) =>
        this.getIsCurrentlyLive(coordinates[0], coordinates[1])
          ? nbOfLiveNeighbours + 1
          : nbOfLiveNeighbours,
      0
    );
  }

  willBeLive(isCurrentlyLive: boolean, nbOfNeighbours: number): boolean {
    if (isCurrentlyLive) {
      return [2, 3].includes(nbOfNeighbours);
    } else if (!isCurrentlyLive) {
      return nbOfNeighbours === 3;
    }
    return false;
  }

  start() {
    this.afterGridChangeCallback(this.grid);
    this.timer = setInterval(() => {
      this.calculateNewGrid();
      this.afterGridChangeCallback(this.grid);
    }, this.interval);
  }

  destroyTimer() {
    clearInterval(this.timer);
  }
}
