export class MazeEnvironment {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows * cols).fill(0);
        this.goalPos = rows * cols - 1;
        this.trapPos = [Math.floor(rows * cols / 2)];
        this.grid[this.goalPos] = 2;
        this.trapPos.forEach(p => this.grid[p] = 3);
    }

    getState(row, col) { return row * this.cols + col; }
    getCoords(state) { return { row: Math.floor(state / this.cols), col: state % this.cols }; }

    move(state, action) {
        let { row, col } = this.getCoords(state);
        if (action === 0 && row > 0) row--;
        if (action === 1 && row < this.rows - 1) row++;
        if (action === 2 && col > 0) col--;
        if (action === 3 && col < this.cols - 1) col++;
        const nextState = this.getState(row, col);
        let reward = -1;
        let done = false;
        const cellType = this.grid[nextState];
        if (cellType === 2) { reward = 100; done = true; }
        else if (cellType === 3) { reward = -100; }
        return { nextState, reward, done };
    }
}
