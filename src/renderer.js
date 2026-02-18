import * as THREE from 'three';

export class RobotRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        this.addLights();
        this.createRobot();
        this.addGrid();

        window.addEventListener('resize', () => this.onResize());
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0x00ffff, 2);
        spotLight.position.set(5, 10, 5);
        this.scene.add(spotLight);
    }

    addGrid() {
        const grid = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
        this.scene.add(grid);
    }

    createRobot() {
        // Material
        this.material = new THREE.MeshPhongMaterial({ color: 0x00d2ff, emissive: 0x004455 });

        // Base
        this.baseJoint = new THREE.Group();
        const baseGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.2, 32);
        const baseMesh = new THREE.Mesh(baseGeo, this.material);
        this.baseJoint.add(baseMesh);
        this.scene.add(this.baseJoint);

        // Shoulder
        this.shoulderJoint = new THREE.Group();
        this.shoulderJoint.position.y = 0.1;
        this.baseJoint.add(this.shoulderJoint);

        // Arm 1
        const arm1Geo = new THREE.BoxGeometry(0.2, 2, 0.2);
        const arm1Mesh = new THREE.Mesh(arm1Geo, this.material);
        arm1Mesh.position.y = 1;
        this.shoulderJoint.add(arm1Mesh);

        // Elbow
        this.elbowJoint = new THREE.Group();
        this.elbowJoint.position.y = 2;
        this.shoulderJoint.add(this.elbowJoint);

        // Arm 2
        const arm2Geo = new THREE.BoxGeometry(0.2, 1.5, 0.2);
        const arm2Mesh = new THREE.Mesh(arm2Geo, this.material);
        arm2Mesh.position.y = 0.75;
        this.elbowJoint.add(arm2Mesh);

        // Target Marker
        this.targetMarker = new THREE.Mesh(
            new THREE.SphereGeometry(0.1),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        this.scene.add(this.targetMarker);
    }

    setAngles(base, shoulder, elbow) {
        this.baseJoint.rotation.y = base;
        this.shoulderJoint.rotation.z = -shoulder;
        this.elbowJoint.rotation.z = -elbow;
    }

    setTarget(x, y, z) {
        this.targetMarker.position.set(x, z, -y); // Swizzled for Three.js coord system
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}
