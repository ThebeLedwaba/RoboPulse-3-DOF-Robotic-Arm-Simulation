# Systems & AI Engineering Portfolio

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Modern-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)](https://threejs.org/)
[![AI](https://img.shields.io/badge/AI-Reinforcement--Learning-blue)](./AI-Maze-Solver)

This repository contains a collection of advanced projects designed for computer systems and AI engineering. It demonstrates core principles in kinematics, autonomous decision-making, and real-time system visualization.

---

## 1. RoboPulse | 3-DOF Robotic Arm Simulation

RoboPulse is a high-fidelity simulation of a 3-Degree of Freedom robotic arm. It implements precise Inverse Kinematics (IK) logic to bridge the gap between abstract mathematics and physical motion.

### Core Features
- **Geometric IK Engine**: Pure JS implementation of 3-DOF Inverse Kinematics.
- **WebGL Rendering**: High-performance 3D visualization using Three.js.
- **Real-time Telemetry**: Live joint angle tracking (Base, Shoulder, Elbow).

### Running RoboPulse
```bash
npx vite
```
Access at `http://localhost:5173`.

---

## 2.NeuralMaze | RL AI Maze Solver

NeuralMaze implements a Reinforcement Learning (RL) agent that uses the **Q-Learning algorithm** to master autonomous navigation.

### Core Features
- **Q-Learning Brain**: Custom-coded TD-learning algorithm (no black-box libraries).
- **Heatmap Visualization**: Real-time transparency of the agent's internal state-value model.
- **Dynamic Training**: Adjustable Alpha, Gamma, and Epsilon parameters.

### Running NeuralMaze
```bash
npx vite ./AI-Maze-Solver
```
Access at `http://localhost:5173` (or the port specified by Vite).

---

## Portfolio Specifications

| Category | Technology | Engineering Focus |
| :--- | :--- | :--- |
| **Robotics** | Three.js, Kinematics | Mathematical Modeling, WebGL |
| **AI** | Q-Learning, Canvas | Reinforcement Learning, Observability |
| **Tooling** | Vite, TypeScript, CSS | Modern System UI, Performance |

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ThebeLedwaba/RoboPulse-3-DOF-Robotic-Arm-Simulation.git
   ```
2. Explore the projects in their respective directories (`./` and `./AI-Maze-Solver`).

---

## License
MIT License. Developed with passion for high-performance systems engineering.
