import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';
import { EXPERIENCE_ROADMAP } from '../data/portfolioData';

export const BrunoRoadmap3D = ({ activeStep, onSelectStep }) => {
  const containerRef = useRef(null);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [currentZone, setCurrentZone] = useState(activeStep || 4);
  const [isAutoDriving, setIsAutoDriving] = useState(false);

  // Refs for animation loop & state persistence
  const sceneStateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    car: null,
    wheels: [],
    frontWheels: [],
    checkpoints: [],
    autoDriveTarget: null,
    speed: 0,
    angle: 0,
    steeringAngle: 0,
    keys: { forward: false, backward: false, left: false, right: false, brake: false }
  });

  // Waypoints along the road connecting Phase 1 -> 2 -> 3 -> 4 -> 5
  const ROAD_WAYPOINTS = [
    { x: -28, z: -18, phase: 1, name: "G-Tech Community" },
    { x: -16, z: -18 },
    { x: -8, z: -10, phase: 2, name: "KTU & IIT Kanpur" },
    { x: 0, z: -6 },
    { x: 10, z: -14, phase: 3, name: "Regional Technologies" },
    { x: 18, z: -4 },
    { x: 18, z: 8, phase: 4, name: "Exouzia ERP Core" },
    { x: 8, z: 18 },
    { x: -12, z: 18, phase: 5, name: "Continuous AI Vision" },
    { x: -24, z: 8 },
    { x: -28, z: -4 }
  ];

  const CHECKPOINT_COORDS = {
    1: { x: -28, z: -18, angle: 0 },
    2: { x: -8, z: -10, angle: Math.PI * 0.2 },
    3: { x: 10, z: -14, angle: Math.PI * 0.4 },
    4: { x: 18, z: 8, angle: Math.PI * 0.9 },
    5: { x: -12, z: 18, angle: Math.PI * 1.5 }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f1e8);
    scene.fog = new THREE.FogExp2(0xf6f1e8, 0.015);

    // 2. Camera (Isometric Top-Down Angle)
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 300);
    camera.position.set(0, 36, 38);
    camera.lookAt(0, 0, 0);

    // 3. Renderer with soft shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting (Warm Editorial Sunlight + Skylight)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.25);
    sunLight.position.set(30, 45, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.4);
    fillLight.position.set(-30, 20, -20);
    scene.add(fillLight);

    // 5. Ground Floor with stylized grid tiles
    const groundGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xf5eee3,
      roughness: 0.9,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle decorative grid lines on ground
    const gridHelper = new THREE.GridHelper(150, 30, 0xe2d7c5, 0xede3d3);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // 6. Build the Winding Asphalt Road Track
    const roadCurvePoints = ROAD_WAYPOINTS.map(p => new THREE.Vector3(p.x, 0.08, p.z));
    roadCurvePoints.push(roadCurvePoints[0]); // close loop
    const roadCurve = new THREE.CatmullRomCurve3(roadCurvePoints, true, 'catmullrom', 0.15);

    // Create road ribbon mesh
    const roadSegments = 240;
    const roadWidth = 5.2;
    const roadPoints = roadCurve.getPoints(roadSegments);
    const roadGeo = new THREE.BufferGeometry();
    const positions = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= roadSegments; i++) {
      const t = i / roadSegments;
      const pt = roadCurve.getPoint(t);
      const tangent = roadCurve.getTangent(t).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      const leftPt = pt.clone().add(normal.clone().multiplyScalar(-roadWidth / 2));
      const rightPt = pt.clone().add(normal.clone().multiplyScalar(roadWidth / 2));

      positions.push(leftPt.x, 0.08, leftPt.z);
      positions.push(rightPt.x, 0.08, rightPt.z);
      uvs.push(0, t * 20);
      uvs.push(1, t * 20);

      if (i < roadSegments) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }
    roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    roadGeo.setIndex(indices);
    roadGeo.computeVertexNormals();

    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x38332f,
      roughness: 0.85,
      metalness: 0.1
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);

    // Road White Dashed Center Line
    const centerLinePoints = roadCurve.getPoints(400);
    const lineMat = new THREE.LineDashedMaterial({
      color: 0xfef3c7,
      dashSize: 0.9,
      gapSize: 0.8,
      linewidth: 3
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints(centerLinePoints);
    const centerLine = new THREE.Line(lineGeo, lineMat);
    centerLine.computeLineDistances();
    centerLine.position.y = 0.11;
    scene.add(centerLine);

    // 7. Checkpoints & Milestone Portals
    const checkpoints = [];

    EXPERIENCE_ROADMAP.forEach((milestone) => {
      const coord = CHECKPOINT_COORDS[milestone.step];
      if (!coord) return;

      const cpGroup = new THREE.Group();
      cpGroup.position.set(coord.x, 0, coord.z);

      // Circular glowing zone pad
      const padGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.18, 32);
      const padMat = new THREE.MeshStandardMaterial({
        color: milestone.statusType === 'active' ? 0xd97706 : 0x78716c,
        roughness: 0.4,
        metalness: 0.2
      });
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.y = 0.09;
      pad.receiveShadow = true;
      cpGroup.add(pad);

      // Outer dashed glowing pulse ring
      const ringGeo = new THREE.RingGeometry(3.8, 4.3, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: milestone.statusType === 'active' ? 0xf59e0b : 0xa8a29e,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.12;
      cpGroup.add(ring);

      // 3D Billboard Sign
      const postMat = new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.7 });
      const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8), postMat);
      post1.position.set(-1.8, 1.6, 0);
      post1.castShadow = true;
      cpGroup.add(post1);

      const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8), postMat);
      post2.position.set(1.8, 1.6, 0);
      post2.castShadow = true;
      cpGroup.add(post2);

      // Signboard panel with canvas texture
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = milestone.statusType === 'active' ? '#d97706' : '#292524';
      ctx.fillRect(0, 0, 512, 256);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 12;
      ctx.strokeRect(8, 8, 496, 240);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`PHASE ${milestone.step}`, 256, 70);

      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(milestone.organization.slice(0, 16), 256, 140);

      ctx.fillStyle = '#fde68a';
      ctx.font = '30px monospace';
      ctx.fillText(milestone.phase.split(': ')[1] || milestone.phase, 256, 200);

      const signTex = new THREE.CanvasTexture(canvas);
      const signMat = new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.4 });
      const signMesh = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.9, 0.2), signMat);
      signMesh.position.set(0, 2.6, 0);
      signMesh.castShadow = true;
      cpGroup.add(signMesh);

      // Add hovering crystal beacon
      const crystalGeo = new THREE.OctahedronGeometry(0.4, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: milestone.statusType === 'active' ? 0x10b981 : 0xf59e0b,
        emissive: milestone.statusType === 'active' ? 0x059669 : 0xd97706,
        roughness: 0.2
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.set(0, 4.2, 0);
      crystal.name = 'crystal';
      cpGroup.add(crystal);

      scene.add(cpGroup);
      checkpoints.push({ step: milestone.step, group: cpGroup, x: coord.x, z: coord.z, crystal });
    });

    // 8. Low-Poly Environment Props (Trees, Rocks - Bruno Simon Style)
    const treeTrunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 1.2, 6);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const foliageGeo = new THREE.ConeGeometry(1.6, 2.8, 6);
    const foliageMat1 = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 });
    const foliageMat2 = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });

    const createTree = (x, z, scale = 1) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.y = 0.6;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(foliageGeo, Math.random() > 0.5 ? foliageMat1 : foliageMat2);
      foliage.position.y = 2.4;
      foliage.castShadow = true;
      tree.add(foliage);

      tree.position.set(x, 0, z);
      tree.scale.set(scale, scale, scale);
      scene.add(tree);
    };

    const treeSpots = [
      [-36, -26], [-32, -10], [-20, -28], [-12, -22], [4, -20],
      [18, -24], [28, -18], [28, -2], [26, 14], [14, 26],
      [0, 24], [-18, 26], [-30, 16], [-2, 0], [4, 6], [-10, 4]
    ];
    treeSpots.forEach(([x, z]) => {
      createTree(x + (Math.random() - 0.5) * 3, z + (Math.random() - 0.5) * 3, 0.8 + Math.random() * 0.4);
    });

    // Stylized low-poly rocks
    const rockGeo = new THREE.DodecahedronGeometry(0.7, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0xa8a29e, roughness: 0.9 });
    [[-18, -8], [6, -4], [24, 6], [-6, 12], [-22, 2]].forEach(([rx, rz]) => {
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(rx, 0.4, rz);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    });

    // 9. The Bruno Simon Stylized Toy Rover Car!
    const carGroup = new THREE.Group();

    // Car Body / Chassis (Vibrant Amber-Red)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.35,
      metalness: 0.3
    });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 2.6), bodyMat);
    chassis.position.y = 0.5;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    carGroup.add(chassis);

    // Car Cabin (White / Cream Roof with glass windows)
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.52, 1.3), cabinMat);
    cabin.position.set(0, 0.95, -0.15);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Windshield (dark tinted glass)
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.1 });
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.38, 0.08), glassMat);
    windshield.position.set(0, 0.92, 0.52);
    windshield.rotation.x = 0.2;
    carGroup.add(windshield);

    // Front Bumper / Grille
    const bumperMat = new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.8 });
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.25, 0.25), bumperMat);
    frontBumper.position.set(0, 0.38, 1.35);
    carGroup.add(frontBumper);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.9 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, metalness: 0.5 });

    const wheels = [];
    const frontWheels = [];
    const wheelPositions = [
      { x: -0.9, y: 0.36, z: 0.82, isFront: true },
      { x: 0.9, y: 0.36, z: 0.82, isFront: true },
      { x: -0.9, y: 0.36, z: -0.82, isFront: false },
      { x: 0.9, y: 0.36, z: -0.82, isFront: false }
    ];

    wheelPositions.forEach((wp) => {
      const wheelHolder = new THREE.Group();
      wheelHolder.position.set(wp.x, wp.y, wp.z);

      const tire = new THREE.Mesh(wheelGeo, wheelMat);
      tire.castShadow = true;
      wheelHolder.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.3, 8), rimMat);
      rim.rotateZ(Math.PI / 2);
      wheelHolder.add(rim);

      carGroup.add(wheelHolder);
      wheels.push(tire);
      if (wp.isFront) frontWheels.push(wheelHolder);
    });

    // Headlights
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const hlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.16, 0.08), headlightMat);
    hlLeft.position.set(-0.55, 0.55, 1.32);
    carGroup.add(hlLeft);

    const hlRight = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.16, 0.08), headlightMat);
    hlRight.position.set(0.55, 0.55, 1.32);
    carGroup.add(hlRight);

    // Start car at active milestone
    const initialCoord = CHECKPOINT_COORDS[activeStep || 4] || CHECKPOINT_COORDS[4];
    carGroup.position.set(initialCoord.x, 0, initialCoord.z);
    carGroup.rotation.y = initialCoord.angle || 0;
    scene.add(carGroup);

    // Save refs
    sceneStateRef.current = {
      scene,
      camera,
      renderer,
      car: carGroup,
      wheels,
      frontWheels,
      checkpoints,
      pos: carGroup.position,
      angle: carGroup.rotation.y,
      speed: 0,
      steeringAngle: 0,
      autoDriveTarget: null,
      keys: { forward: false, backward: false, left: false, right: false, brake: false }
    };

    // 10. Keyboard Controls
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      const keys = sceneStateRef.current.keys;
      let handled = false;

      if (k === 'w' || k === 'arrowup') { keys.forward = true; handled = true; }
      if (k === 's' || k === 'arrowdown') { keys.backward = true; handled = true; }
      if (k === 'a' || k === 'arrowleft') { keys.left = true; handled = true; }
      if (k === 'd' || k === 'arrowright') { keys.right = true; handled = true; }
      if (k === ' ') { keys.brake = true; handled = true; }

      if (handled) {
        sceneStateRef.current.autoDriveTarget = null;
        setIsAutoDriving(false);
      }
    };

    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      const keys = sceneStateRef.current.keys;
      if (k === 'w' || k === 'arrowup') keys.forward = false;
      if (k === 's' || k === 'arrowdown') keys.backward = false;
      if (k === 'a' || k === 'arrowleft') keys.left = false;
      if (k === 'd' || k === 'arrowright') keys.right = false;
      if (k === ' ') keys.brake = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 11. Physics & Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const state = sceneStateRef.current;
      if (!state.car) return;

      const keys = state.keys;

      // Handle Autopilot Driving
      if (state.autoDriveTarget) {
        const dx = state.autoDriveTarget.x - state.car.position.x;
        const dz = state.autoDriveTarget.z - state.car.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist > 1.2) {
          const targetAngle = Math.atan2(dx, dz);
          let diffAngle = targetAngle - state.angle;
          while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
          while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;

          state.steeringAngle = THREE.MathUtils.clamp(diffAngle * 1.5, -0.6, 0.6);
          state.speed = THREE.MathUtils.lerp(state.speed, Math.min(dist * 2.8, 14), delta * 4);
        } else {
          state.autoDriveTarget = null;
          setIsAutoDriving(false);
          state.speed = THREE.MathUtils.lerp(state.speed, 0, delta * 8);
        }
      } else {
        // Manual Driving Physics
        const maxSpeed = 22;
        const accel = 26;
        const friction = 8;
        const brakePower = 34;

        if (keys.forward) {
          state.speed = Math.min(state.speed + accel * delta, maxSpeed);
        } else if (keys.backward) {
          state.speed = Math.max(state.speed - accel * delta, -maxSpeed * 0.5);
        } else {
          if (state.speed > 0) state.speed = Math.max(state.speed - friction * delta, 0);
          else if (state.speed < 0) state.speed = Math.min(state.speed + friction * delta, 0);
        }

        if (keys.brake) {
          if (state.speed > 0) state.speed = Math.max(state.speed - brakePower * delta, 0);
          else if (state.speed < 0) state.speed = Math.min(state.speed + brakePower * delta, 0);
        }

        const maxSteer = 0.58;
        const steerSpeed = 4.5;
        if (keys.left) {
          state.steeringAngle = Math.min(state.steeringAngle + steerSpeed * delta, maxSteer);
        } else if (keys.right) {
          state.steeringAngle = Math.max(state.steeringAngle - steerSpeed * delta, -maxSteer);
        } else {
          state.steeringAngle = THREE.MathUtils.lerp(state.steeringAngle, 0, delta * 8);
        }
      }

      // Rotate car if moving
      if (Math.abs(state.speed) > 0.05) {
        const turnMult = state.speed > 0 ? 1 : -1;
        state.angle += state.steeringAngle * (state.speed / 14) * delta * turnMult * 2.6;
      }

      state.frontWheels.forEach(w => {
        w.rotation.y = state.steeringAngle;
      });

      const wheelCircumference = 0.36 * Math.PI * 2;
      const spinAngle = (state.speed * delta) / wheelCircumference;
      state.wheels.forEach(w => {
        w.rotation.x += spinAngle * 3;
      });

      const vx = Math.sin(state.angle) * state.speed * delta;
      const vz = Math.cos(state.angle) * state.speed * delta;
      state.car.position.x += vx;
      state.car.position.z += vz;
      state.car.rotation.y = state.angle;

      state.car.position.x = THREE.MathUtils.clamp(state.car.position.x, -55, 55);
      state.car.position.z = THREE.MathUtils.clamp(state.car.position.z, -45, 45);

      // Check proximity to Checkpoints
      let nearestZone = null;
      let minDist = 999;
      state.checkpoints.forEach(cp => {
        const dist = Math.hypot(cp.x - state.car.position.x, cp.z - state.car.position.z);
        if (dist < 4.2) {
          nearestZone = cp.step;
        }
        if (dist < minDist) minDist = dist;

        if (cp.crystal) {
          cp.crystal.rotation.y += delta * 2;
          cp.crystal.position.y = 4.2 + Math.sin(clock.getElapsedTime() * 3 + cp.step) * 0.25;
        }
      });

      if (nearestZone && nearestZone !== currentZone) {
        setCurrentZone(nearestZone);
        if (onSelectStep) onSelectStep(nearestZone);
      }

      // Camera Smooth Follow
      const targetCamX = state.car.position.x - Math.sin(state.angle) * 16;
      const targetCamZ = state.car.position.z - Math.cos(state.angle) * 16;
      const targetCamY = 22;

      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, delta * 3.5);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, delta * 3.5);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ + 6, delta * 3.5);
      state.camera.lookAt(state.car.position.x, state.car.position.y + 1, state.car.position.z);

      setSpeedKmh(Math.round(Math.abs(state.speed) * 3.6));
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const driveToMilestone = (stepNumber) => {
    const coord = CHECKPOINT_COORDS[stepNumber];
    if (!coord || !sceneStateRef.current.car) return;

    setIsAutoDriving(true);
    sceneStateRef.current.autoDriveTarget = coord;
    setCurrentZone(stepNumber);
    if (onSelectStep) onSelectStep(stepNumber);
  };

  const resetCar = () => {
    const state = sceneStateRef.current;
    if (!state.car) return;
    const coord = CHECKPOINT_COORDS[currentZone] || CHECKPOINT_COORDS[4];
    state.car.position.set(coord.x, 0, coord.z);
    state.angle = coord.angle || 0;
    state.car.rotation.y = state.angle;
    state.speed = 0;
    state.steeringAngle = 0;
    state.autoDriveTarget = null;
    setIsAutoDriving(false);
  };

  return (
    <div className="bruno-3d-roadmap-container">
      {/* 3D Canvas Canvas Viewport */}
      <div className="bruno-canvas-wrapper" ref={containerRef}></div>

      {/* Bruno Simon Style HUD Overlay Controls */}
      <div className="bruno-hud-overlay">
        {/* Top Control Bar: Active Zone & Speedometer */}
        <div className="bruno-hud-top">
          <div className="bruno-badge-active-zone">
            <span className="bruno-zone-dot"></span>
            <span>CheckPoint: Phase 0{currentZone}</span>
          </div>

          <div className="bruno-speedometer">
            <span className="speed-val">{speedKmh}</span>
            <span className="speed-unit">KM/H</span>
          </div>

          <button
            type="button"
            className="bruno-btn-icon"
            onClick={resetCar}
            title="Reset Vehicle"
          >
            <RotateCcw size={15} />
            <span>Reset Car</span>
          </button>
        </div>

        {/* Bottom Interactive Checkpoint Bar: Autopilot to any phase */}
        <div className="bruno-hud-checkpoints">
          {EXPERIENCE_ROADMAP.map((m) => {
            const isActive = currentZone === m.step;

            return (
              <button
                key={m.step}
                type="button"
                className={`bruno-checkpoint-btn ${isActive ? 'active' : ''}`}
                onClick={() => driveToMilestone(m.step)}
              >
                <span className="cp-phase">Phase 0{m.step}</span>
                <span className="cp-name">{m.organization.split(' ')[0]}</span>
                {isActive && <span className="cp-beam"></span>}
              </button>
            );
          })}
        </div>

        {/* Driving Keys Tip Banner */}
        <div className="bruno-keys-help">
          <span className="help-chip">🎮 W / ↑ Accelerate</span>
          <span className="help-chip">A / D Steer</span>
          <span className="help-chip">S / ↓ Reverse</span>
          <span className="help-chip">Space Brake</span>
        </div>
      </div>
    </div>
  );
};

export default BrunoRoadmap3D;
