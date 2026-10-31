import * as THREE from 'three';

export type FlightCallbacks = {
  onCollect: (count: number, total: number) => void;
  onExit: () => void;
};

export type FlightOptions = {
  canvas: HTMLCanvasElement;
  dark: boolean;
  targets: string[];
  callbacks: FlightCallbacks;
};

const RIBBON = 0xb3261e;

/* ----------------------------- textures ------------------------------ */

const canvasTexture = (
  w: number,
  h: number,
  draw: (c: CanvasRenderingContext2D) => void,
) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

/** Vertical sky gradient for the dome. */
const skyTexture = (dark: boolean) =>
  canvasTexture(4, 256, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    if (dark) {
      g.addColorStop(0, '#04060d');
      g.addColorStop(0.55, '#0b1226');
      g.addColorStop(1, '#1b2742');
    } else {
      g.addColorStop(0, '#6fa6dc');
      g.addColorStop(0.5, '#a9cdef');
      g.addColorStop(1, '#eef3f8');
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 256);
  });

/** Soft puffy cloud: overlapping radial blobs. */
const cloudTexture = () =>
  canvasTexture(256, 128, (ctx) => {
    const blobs = [
      [70, 80, 48],
      [120, 60, 56],
      [175, 78, 46],
      [100, 90, 40],
      [150, 92, 38],
    ];
    for (const [x, y, r] of blobs) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,255,255,0.95)');
      g.addColorStop(0.6, 'rgba(255,255,255,0.55)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 128);
    }
  });

/** Glowing disc for the sun / moon. */
const glowTexture = (inner: string, outer: string) =>
  canvasTexture(128, 128, (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  });

/** Keycap-looking sprite with the skill name drawn on a canvas. */
const keycapTexture = (label: string) =>
  canvasTexture(256, 96, (ctx) => {
    ctx.fillStyle = '#fffdf7';
    ctx.strokeStyle = '#1c2433';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(6, 6, 244, 78, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#b3261e';
    ctx.fillRect(12, 76, 232, 8);
    ctx.fillStyle = '#1c2433';
    ctx.font = 'bold 34px "JetBrains Mono", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 128, 44);
  });

/* ------------------------------ objects ------------------------------ */

/** Folded dart: dihedral wings, centre keel, visible crease lines, shadow. */
const makePlane = () => {
  const nose = [0, 0, -1.9];
  const tipL = [-1.55, 0.22, 1.25];
  const tipR = [1.55, 0.22, 1.25];
  const foldL = [-0.3, 0.06, 1.3];
  const foldR = [0.3, 0.06, 1.3];
  const keel = [0, -0.55, 1.15];
  const tri = (a: number[], b: number[], c: number[]) => [...a, ...b, ...c];
  const positions = new Float32Array([
    ...tri(nose, tipL, foldL), // left wing
    ...tri(nose, foldR, tipR), // right wing
    ...tri(nose, foldL, keel), // left body
    ...tri(nose, keel, foldR), // right body
    ...tri(foldL, foldR, keel), // tail closing face
  ]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.computeVertexNormals();

  const body = new THREE.Mesh(
    g,
    new THREE.MeshStandardMaterial({
      color: 0xf7f2e8,
      side: THREE.DoubleSide,
      flatShading: true,
      roughness: 0.95,
    }),
  );
  body.castShadow = true;

  const creases = new THREE.LineSegments(
    new THREE.EdgesGeometry(g, 10),
    new THREE.LineBasicMaterial({
      color: 0x8a8273,
      transparent: true,
      opacity: 0.6,
    }),
  );

  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.03, 2.9),
    new THREE.MeshStandardMaterial({ color: RIBBON }),
  );
  stripe.position.set(0, 0.05, -0.3);

  const group = new THREE.Group();
  group.add(body, creases, stripe);
  return group;
};

/** Thin streaks that rush past the plane; brighter with speed. */
const makeWindStreaks = (count: number) => {
  const positions = new Float32Array(count * 6);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
  });
  const lines = new THREE.LineSegments(geometry, material);
  lines.frustumCulled = false;
  // local offsets around the plane: x, y, z(ahead negative)
  const local = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 6,
    z: -Math.random() * 30,
    len: 1.5 + Math.random() * 2.5,
  }));
  return { lines, local, positions };
};

/* ------------------------------- scene ------------------------------- */

/**
 * Arcade flight over a desk. W/S pitch, A/D bank, Shift boost, Esc lands.
 * Collect the floating keycaps. Returns a dispose function.
 */
export const startFlight = ({
  canvas,
  dark,
  targets,
  callbacks,
}: FlightOptions) => {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const horizon = dark ? 0x1b2742 : 0xeef3f8;
  scene.fog = new THREE.Fog(horizon, 90, 320);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    900,
  );

  // sky dome
  const skyMat = new THREE.MeshBasicMaterial({
    map: skyTexture(dark),
    side: THREE.BackSide,
    fog: false,
    depthWrite: false,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(420, 32, 16), skyMat);
  scene.add(sky);

  // sun / moon + stars
  const orb = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: dark
        ? glowTexture('rgba(235,240,255,1)', 'rgba(235,240,255,0)')
        : glowTexture('rgba(255,250,225,1)', 'rgba(255,220,150,0)'),
      transparent: true,
      fog: false,
      depthWrite: false,
    }),
  );
  orb.scale.set(dark ? 40 : 90, dark ? 40 : 90, 1);
  orb.position.set(-180, 170, -260);
  scene.add(orb);
  if (dark) {
    const n = 900;
    const pts = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const e = Math.random() * Math.PI * 0.45 + 0.05;
      const r = 400;
      pts[i * 3] = Math.cos(a) * Math.cos(e) * r;
      pts[i * 3 + 1] = Math.sin(e) * r;
      pts[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r;
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    scene.add(
      new THREE.Points(
        sg,
        new THREE.PointsMaterial({
          color: 0xdfe6ff,
          size: 1.6,
          sizeAttenuation: false,
          transparent: true,
          opacity: 0.8,
          fog: false,
        }),
      ),
    );
  }

  // lights
  scene.add(
    new THREE.HemisphereLight(
      dark ? 0x3a4a7a : 0xcfe3ff,
      dark ? 0x141a2a : 0xc8b89a,
      dark ? 0.7 : 0.75,
    ),
  );
  const sun = new THREE.DirectionalLight(
    dark ? 0xaab8ff : 0xffe7c0,
    dark ? 0.6 : 1.0,
  );
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 120;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -30;
  sun.shadow.camera.right = sun.shadow.camera.top = 30;
  sun.shadow.bias = -0.0005;
  scene.add(sun, sun.target);

  // desk
  const desk = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 900),
    new THREE.MeshStandardMaterial({
      color: dark ? 0x121a2b : 0xe3d8c3,
      roughness: 1,
    }),
  );
  desk.rotation.x = -Math.PI / 2;
  desk.receiveShadow = true;
  scene.add(desk);
  const grid = new THREE.GridHelper(
    900,
    45,
    dark ? 0x1f2940 : 0xd3c7b0,
    dark ? 0x182036 : 0xdacfb9,
  );
  grid.position.y = 0.02;
  scene.add(grid);

  // sheets of paper lying around, for scale
  const sheetMat = new THREE.MeshStandardMaterial({
    color: 0xf6f1e6,
    roughness: 1,
  });
  for (let i = 0; i < 16; i++) {
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(21, 29.7), sheetMat);
    sheet.rotation.x = -Math.PI / 2;
    sheet.rotation.z = (Math.random() - 0.5) * 0.6;
    const r = 40 + Math.random() * 140;
    const a = Math.random() * Math.PI * 2;
    sheet.position.set(Math.cos(a) * r, 0.05 + i * 0.002, Math.sin(a) * r);
    sheet.receiveShadow = true;
    scene.add(sheet);
  }

  // clouds (drift with the wind)
  const cloudMap = cloudTexture();
  const clouds: THREE.Sprite[] = [];
  for (let i = 0; i < 42; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: cloudMap,
        transparent: true,
        depthWrite: false,
        opacity: dark ? 0.35 : 0.85,
        color: dark ? 0x7f93c4 : 0xffffff,
      }),
    );
    const w = 28 + Math.random() * 40;
    s.scale.set(w, w * 0.5, 1);
    const a = Math.random() * Math.PI * 2;
    const r = 50 + Math.random() * 200;
    s.position.set(Math.cos(a) * r, 26 + Math.random() * 30, Math.sin(a) * r);
    clouds.push(s);
    scene.add(s);
  }

  // targets
  const caps = targets.map((label, i) => {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: keycapTexture(label),
        transparent: true,
      }),
    );
    s.scale.set(4, 1.5, 1);
    const a = (i / targets.length) * Math.PI * 2;
    const r = 35 + (i % 3) * 18;
    s.position.set(Math.cos(a) * r, 6 + (i % 4) * 4, Math.sin(a) * r);
    scene.add(s);
    return s;
  });
  let collected = 0;

  const plane = makePlane();
  plane.position.set(0, 8, 30);
  scene.add(plane);
  const streaks = makeWindStreaks(70);
  scene.add(streaks.lines);

  // start the chase camera in place (no swoop in from the origin)
  camera.position.copy(plane.position).add(new THREE.Vector3(0, 2.2, 7.5));
  camera.lookAt(plane.position.clone().add(new THREE.Vector3(0, 0, -6)));

  // controls
  const keys = new Set<string>();
  const onKey = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (e.type === 'keydown' && k === 'escape') {
      callbacks.onExit();
      return;
    }
    if (
      [
        'w',
        'a',
        's',
        'd',
        'shift',
        'arrowup',
        'arrowdown',
        'arrowleft',
        'arrowright',
      ].includes(k)
    ) {
      e.preventDefault();
      if (e.type === 'keydown') keys.add(k);
      else keys.delete(k);
    }
  };
  window.addEventListener('keydown', onKey);
  window.addEventListener('keyup', onKey);
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };
  window.addEventListener('resize', onResize);

  const forward = new THREE.Vector3();
  const camOffset = new THREE.Vector3();
  const camTarget = new THREE.Vector3();
  const qTmp = new THREE.Quaternion();
  const vTmp = new THREE.Vector3();
  const X = new THREE.Vector3(1, 0, 0);
  const Y = new THREE.Vector3(0, 1, 0);
  const wind = new THREE.Vector3(1, 0, 0);
  let roll = 0;
  let speedVis = 0;
  let last = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = now / 1000;

    const up = keys.has('w') || keys.has('arrowup');
    const down = keys.has('s') || keys.has('arrowdown');
    const left = keys.has('a') || keys.has('arrowleft');
    const right = keys.has('d') || keys.has('arrowright');
    const boost = keys.has('shift');

    // slowly veering wind with gusts
    const gust = 0.6 + 0.4 * Math.sin(t * 0.7) + 0.25 * Math.sin(t * 2.3);
    wind.set(Math.cos(t * 0.08), 0, Math.sin(t * 0.08)).multiplyScalar(gust);

    // pitch (local X), yaw (world Y); roll is cosmetic banking
    const pitch = (up ? 1 : 0) - (down ? 1 : 0);
    const yaw = (left ? 1 : 0) - (right ? 1 : 0);
    plane.quaternion.multiply(qTmp.setFromAxisAngle(X, pitch * 0.9 * dt));
    forward.set(0, 0, -1).applyQuaternion(plane.quaternion);
    if (Math.abs(forward.y) > 0.82) {
      plane.quaternion.multiply(
        qTmp.setFromAxisAngle(X, -Math.sign(forward.y) * 1.5 * dt),
      );
    }
    plane.quaternion.premultiply(qTmp.setFromAxisAngle(Y, yaw * 1.4 * dt));
    const targetRoll = -yaw * 0.9;
    roll += (targetRoll - roll) * Math.min(1, 6 * dt);

    const speed = boost ? 34 : 18;
    speedVis += ((boost ? 1 : 0.25) - speedVis) * Math.min(1, 3 * dt);
    forward.set(0, 0, -1).applyQuaternion(plane.quaternion);
    plane.position.addScaledVector(forward, speed * dt);
    plane.position.addScaledVector(wind, 2.2 * dt); // pushed by the wind
    plane.position.y -= 0.6 * dt; // gentle sink
    if (plane.position.y < 1.2) {
      plane.position.y = 1.2;
      plane.quaternion.multiply(qTmp.setFromAxisAngle(X, 0.8 * dt));
    }
    if (plane.position.y > 70) plane.position.y = 70;
    const limit = 300;
    if (Math.abs(plane.position.x) > limit) plane.position.x *= -0.98;
    if (Math.abs(plane.position.z) > limit) plane.position.z *= -0.98;

    // flutter in the wind (cosmetic, on the meshes only)
    const flutter =
      gust * (0.025 * Math.sin(t * 9.1) + 0.015 * Math.sin(t * 13.7));
    for (const child of plane.children) {
      child.rotation.z = roll + flutter;
      child.rotation.x = 0.02 * Math.sin(t * 7.3) * gust;
    }

    // wind streaks around the plane, flowing backwards
    const p = streaks.positions;
    streaks.local.forEach((s, i) => {
      s.z += (speed + 20) * dt;
      if (s.z > 8) {
        s.z = -30 - Math.random() * 10;
        s.x = (Math.random() - 0.5) * 10;
        s.y = (Math.random() - 0.5) * 6;
      }
      vTmp
        .set(s.x, s.y, s.z)
        .applyQuaternion(plane.quaternion)
        .add(plane.position);
      p[i * 6] = vTmp.x;
      p[i * 6 + 1] = vTmp.y;
      p[i * 6 + 2] = vTmp.z;
      vTmp
        .set(s.x, s.y, s.z + s.len)
        .applyQuaternion(plane.quaternion)
        .add(plane.position);
      p[i * 6 + 3] = vTmp.x;
      p[i * 6 + 4] = vTmp.y;
      p[i * 6 + 5] = vTmp.z;
    });
    streaks.lines.geometry.attributes.position.needsUpdate = true;
    (streaks.lines.material as THREE.LineBasicMaterial).opacity =
      (dark ? 0.35 : 0.5) * speedVis;

    // clouds drift and gently bob
    for (const c of clouds) {
      c.position.addScaledVector(wind, 0.8 * dt);
      c.position.y += Math.sin(t * 0.4 + c.position.x) * 0.002;
      if (c.position.x > 320) c.position.x = -320;
      if (c.position.x < -320) c.position.x = 320;
      if (c.position.z > 320) c.position.z = -320;
      if (c.position.z < -320) c.position.z = 320;
    }

    // collectibles
    for (const cap of caps) {
      if (!cap.visible) continue;
      cap.position.y += Math.sin(t * 1.6 + cap.position.x) * 0.004;
      if (cap.position.distanceTo(plane.position) < 2.6) {
        cap.visible = false;
        collected += 1;
        callbacks.onCollect(collected, caps.length);
      }
    }

    // shadow light follows the plane
    sun.position.copy(plane.position).add(vTmp.set(20, 45, 15));
    sun.target.position.copy(plane.position);
    sky.position.copy(plane.position);

    // chase camera
    camOffset.set(0, 2.2, 7.5).applyQuaternion(plane.quaternion);
    camera.position.lerp(camOffset.add(plane.position), Math.min(1, 5 * dt));
    camTarget.copy(plane.position).addScaledVector(forward, 6);
    camera.lookAt(camTarget);
    camera.up.set(0, 1, 0);

    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('keyup', onKey);
    window.removeEventListener('resize', onResize);
    scene.traverse((o) => {
      if (
        o instanceof THREE.Mesh ||
        o instanceof THREE.LineSegments ||
        o instanceof THREE.Points
      ) {
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
          if ('map' in m && m.map instanceof THREE.Texture) m.map.dispose();
          m.dispose();
        });
      }
      if (o instanceof THREE.Sprite) {
        o.material.map?.dispose();
        o.material.dispose();
      }
    });
    renderer.dispose();
  };
};
