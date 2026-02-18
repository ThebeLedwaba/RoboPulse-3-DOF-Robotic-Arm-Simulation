import { Kinematics } from './kinematics.js';
import { RobotRenderer } from './renderer.js';

class App {
    constructor() {
        this.kinematics = new Kinematics(2, 1.5); // L1=2, L2=1.5
        this.renderer = new RobotRenderer('canvas-container');

        this.state = {
            x: 1.0,
            y: 1.0,
            z: 1.0
        };

        this.initControls();
        this.update();
        this.renderer.animate();
    }

    initControls() {
        const inputs = ['x', 'y', 'z'];
        inputs.forEach(axis => {
            const el = document.getElementById(`input-${axis}`);
            const valEl = document.getElementById(`val-${axis}`);

            el.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                this.state[axis] = val;
                valEl.textContent = val.toFixed(1);
                this.update();
            });
        });
    }

    update() {
        const { x, y, z } = this.state;

        // Solve IK
        const angles = this.kinematics.inverse(x, y, z);

        // Update Visualization
        this.renderer.setAngles(angles.base, angles.shoulder, angles.elbow);
        this.renderer.setTarget(x, y, z);

        // Update Telemetry UI
        this.updateTelemetry(angles);
    }

    updateTelemetry(angles) {
        const toDeg = (rad) => (rad * 180 / Math.PI).toFixed(2);
        document.getElementById('tel-base').textContent = toDeg(angles.base);
        document.getElementById('tel-shoulder').textContent = toDeg(angles.shoulder);
        document.getElementById('tel-elbow').textContent = toDeg(angles.elbow);
    }
}

// Start App
window.addEventListener('DOMContentLoaded', () => {
    new App();
});
