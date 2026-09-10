// Page-wide 3D backdrop: fixed behind every section. The camera flies toward
// a rebar cage while the user scrolls through the hero, then holds and keeps
// idling for the rest of the page. Progressive enhancement only — falls back
// to the static blueprint-grid background (.hero-static, hero section only)
// when WebGL or `three` is unavailable.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('hero-canvas');
const track = document.querySelector('.hero-track');

if (!reduceMotion && canvas && track && supportsWebGL()) {
  init();
}

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

async function init() {
  let THREE;
  try {
    THREE = await import('three');
  } catch (e) {
    return; // module load failed — keep the static fallback, fail silently
  }

  // Only toggle the opaque fallback (.no-3d) once the canvas's own opacity
  // transition (1.1s, see .hero-canvas in styles.css) actually finishes —
  // never at the instant `ready`/context-lost/context-restored toggles,
  // which would flip every section's background before the canvas behind
  // it has visually caught up.
  canvas.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity') {
      document.documentElement.classList.toggle('no-3d', !canvas.classList.contains('ready'));
    }
  });

  const isNarrow = window.innerWidth < 768;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b1a2d, 8, 34);

  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setClearColor(0x0b1a2d, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isNarrow ? 1.5 : 2));

  // Context loss now degrades the whole page's backdrop, not just the hero,
  // so fall all the way back to the opaque static styling while it's lost
  // rather than leaving every section's glass background over nothing.
  let contextLost = false;
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    contextLost = true;
    canvas.classList.remove('ready'); // fades out; transitionend above restores .no-3d
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    canvas.classList.add('ready'); // fades back in; transitionend above drops .no-3d
    // Doesn't manually re-upload geometry/materials on restore — verified
    // safe for this scene: everything here is procedural BufferGeometry +
    // solid-color MeshBasicMaterial (no textures), which this vendored
    // three.js build re-uploads on its own. Confirmed via WEBGL_lose_context
    // (lose -> restore -> screenshot matched the pre-loss render, no errors).
  });

  // ===== Blueprint ground grid =====
  const grid = new THREE.GridHelper(70, 56, 0xdd8e1f, 0x15293f);
  grid.position.y = -3;
  grid.material.transparent = true;
  grid.material.opacity = 0.32;
  scene.add(grid);

  // ===== Rebar cage: vertical bars + stirrup rings =====
  const cage = new THREE.Group();
  const barCount = 12;
  const radius = 1.5;
  const barHeight = 7;
  const barGeo = new THREE.CylinderGeometry(0.045, 0.045, barHeight, 8);
  const barMat = new THREE.MeshBasicMaterial({ color: 0xf2c066 });

  for (let i = 0; i < barCount; i++) {
    const angle = (i / barCount) * Math.PI * 2;
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    cage.add(bar);
  }

  const ringGeo = new THREE.TorusGeometry(radius, 0.025, 8, 32);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xdd8e1f, transparent: true, opacity: 0.85 });
  const ringCount = 6;
  for (let i = 0; i < ringCount; i++) {
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -barHeight / 2 + (i / (ringCount - 1)) * barHeight;
    cage.add(ring);
  }

  cage.position.set(0, 0.5, -9);
  scene.add(cage);

  // ===== AI verification scan plane — sweeps the cage =====
  const scanGeo = new THREE.PlaneGeometry(radius * 2.6, 0.02);
  const scanMat = new THREE.MeshBasicMaterial({ color: 0xf2c066, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
  const scanLine = new THREE.Mesh(scanGeo, scanMat);
  scanLine.rotation.x = Math.PI / 2;
  cage.add(scanLine);

  // ===== Ambient particles =====
  const particleCount = isNarrow ? 90 : 220;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 8 - 2;
    positions[i * 3 + 2] = -Math.random() * 30;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xdd8e1f, size: 0.05, transparent: true, opacity: 0.5 });
  scene.add(new THREE.Points(particleGeo, particleMat));

  // ===== Camera path: pulled-back/high -> inside the cage =====
  const camStart = new THREE.Vector3(2.2, 3.2, 15);
  const camEnd = new THREE.Vector3(0.4, 0.8, -3.5);
  const lookStart = new THREE.Vector3(0, 1, -9);
  const lookEnd = new THREE.Vector3(0, 0.6, -14);
  const camPos = new THREE.Vector3();
  const lookPos = new THREE.Vector3();

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  window.addEventListener('resize', resize);

  function getProgress() {
    const rect = track.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, -rect.top / total));
  }

  let ready = false;
  const startTime = performance.now();

  function tick() {
    requestAnimationFrame(tick);
    // ponytail: rendering pauses only on a backgrounded tab (document.hidden).
    // It still runs every frame for the whole page whenever the tab is
    // visible — required for the idle backdrop to keep animating past the
    // hero, per the page-wide-backdrop design. Add scroll-based throttling
    // if mobile battery complaints come in.
    if (contextLost || document.hidden) return;

    const t = (performance.now() - startTime) / 1000;
    const p = getProgress();
    const eased = p * p * (3 - 2 * p); // smoothstep

    camPos.lerpVectors(camStart, camEnd, eased);
    lookPos.lerpVectors(lookStart, lookEnd, eased);
    camera.position.copy(camPos);
    camera.lookAt(lookPos);

    cage.rotation.y = t * 0.06;
    scanLine.position.y = -barHeight / 2 + ((Math.sin(t * 0.6) + 1) / 2) * barHeight;

    renderer.render(scene, camera);

    if (!ready) {
      ready = true;
      canvas.classList.add('ready');
    }
  }
  tick();
}
