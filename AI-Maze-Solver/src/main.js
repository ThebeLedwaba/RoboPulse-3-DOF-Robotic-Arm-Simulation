import { QAgent } from './agent.js';
import { MazeEnvironment } from './environment.js';

class Simulation {
    constructor() {
        this.rows = 10;
        this.cols = 10;
        this.cellSize = 40;
        this.env = new MazeEnvironment(this.rows, this.cols);
        this.agent = new QAgent(this.rows * this.cols, 4);
        this.canvas = document.getElementById('grid-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.cols * this.cellSize;
        this.canvas.height = this.rows * this.cellSize;
        this.state = { currentPos: 0, episodes: 0, totalReward: 0, isPlaying: true, fps: 20, history: [] };
        this.initControls();
        this.resetEpisode();
        this.loop();
    }

    initControls() {
        document.getElementById('input-speed').addEventListener('input', (e) => {
            this.state.fps = parseInt(e.target.value);
            document.getElementById('val-speed').textContent = this.state.fps;
        });
        document.getElementById('input-epsilon').addEventListener('input', (e) => {
            this.agent.epsilon = parseFloat(e.target.value);
            document.getElementById('val-epsilon').textContent = this.agent.epsilon.toFixed(2);
        });
        document.getElementById('btn-reset').addEventListener('click', () => {
            this.agent.resetQTable();
            this.state.episodes = 0;
            this.resetEpisode();
        });
        document.getElementById('btn-pause').addEventListener('click', (e) => {
            this.state.isPlaying = !this.state.isPlaying;
            e.target.textContent = this.state.isPlaying ? 'Pause Training' : 'Resume Training';
        });
    }

    resetEpisode() { this.state.currentPos = 0; this.state.totalReward = 0; this.state.episodes++; document.getElementById('episode-count').textContent = this.state.episodes; }

    step() {
        if (!this.state.isPlaying) return;
        const state = this.state.currentPos;
        const action = this.agent.chooseAction(state);
        const { nextState, reward, done } = this.env.move(state, action);
        this.agent.learn(state, action, reward, nextState);
        this.state.currentPos = nextState;
        this.state.totalReward += reward;
        if (done || this.state.totalReward < -500) {
            this.state.history.push(this.state.totalReward);
            if (this.state.history.length > 50) this.state.history.shift();
            const avg = this.state.history.reduce((a, b) => a + b, 0) / this.state.history.length;
            document.getElementById('avg-reward').textContent = avg.toFixed(1);
            if (avg > 50) document.getElementById('convergence-pct').textContent = "95%";
            else if (avg > 0) document.getElementById('convergence-pct').textContent = "70%";
            else document.getElementById('convergence-pct').textContent = "20%";
            this.resetEpisode();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const state = r * this.cols + c;
                const x = c * this.cellSize;
                const y = r * this.cellSize;
                const maxQ = Math.max(...this.agent.qTable[state]);
                if (maxQ > 0) {
                    const alpha = Math.min(0.5, maxQ / 100);
                    this.ctx.fillStyle = `rgba(88, 166, 255, ${alpha})`;
                    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }
                this.ctx.strokeStyle = '#30363d';
                this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                const type = this.env.grid[state];
                if (type === 2) { this.ctx.fillStyle = '#238636'; this.ctx.fillRect(x + 4, y + 4, this.cellSize - 8, this.cellSize - 8); }
                else if (type === 3) { this.ctx.fillStyle = '#da3633'; this.ctx.fillRect(x + 4, y + 4, this.cellSize - 8, this.cellSize - 8); }
            }
        }
        const { row, col } = this.env.getCoords(this.state.currentPos);
        this.ctx.fillStyle = '#58a6ff';
        this.ctx.beginPath();
        this.ctx.arc(col * this.cellSize + this.cellSize / 2, row * this.cellSize + this.cellSize / 2, this.cellSize / 3, 0, Math.PI * 2);
        this.ctx.fill();
    }

    loop() {
        this.step();
        this.draw();
        setTimeout(() => requestAnimationFrame(() => this.loop()), 1000 / this.state.fps);
    }
}
new Simulation();
