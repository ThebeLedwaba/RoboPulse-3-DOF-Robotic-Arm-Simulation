/**
 * Kinematics Engine for 3-DOF Robotic Arm
 * Links: L1 (Base to Elbow), L2 (Elbow to Wrist)
 * Coordinates: (x, y, z)
 */

export class Kinematics {
    constructor(l1, l2) {
        this.l1 = l1; // Length of first arm segment
        this.l2 = l2; // Length of second arm segment
    }

    /**
     * Compute Inverse Kinematics
     * @param {number} x - Target X coordinate
     * @param {number} y - Target Y coordinate
     * @param {number} z - Target Z coordinate
     * @returns {Object} { base, shoulder, elbow } in radians
     */
    inverse(x, y, z) {
        // 1. Base Angle (horizontal rotation)
        const base = Math.atan2(y, x);

        // 2. Projection onto vertical plane
        const r = Math.sqrt(x * x + y * y);
        const d = Math.sqrt(r * r + z * z);

        // Law of Cosines for the elbow angle
        // d^2 = l1^2 + l2^2 - 2*l1*l2*cos(pi - elbow)
        let cosElbow = (d * d - this.l1 * this.l1 - this.l2 * this.l2) / (2 * this.l1 * this.l2);
        
        // Clamp for safety
        cosElbow = Math.max(-1, Math.min(1, cosElbow));
        const elbow = Math.acos(cosElbow);

        // Law of Cosines for the shoulder angle
        // l2^2 = l1^2 + d^2 - 2*l1*d*cos(shoulder_alpha)
        const alpha = Math.atan2(z, r);
        let cosBeta = (this.l1 * this.l1 + d * d - this.l2 * this.l2) / (2 * this.l1 * d);
        cosBeta = Math.max(-1, Math.min(1, cosBeta));
        const beta = Math.acos(cosBeta);

        const shoulder = alpha + beta;

        return {
            base,
            shoulder,
            elbow: elbow - Math.PI / 2 // Offset to match visualization
        };
    }
}
