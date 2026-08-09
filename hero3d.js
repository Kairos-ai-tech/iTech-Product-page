// Scroll-scrubbed 3D hero: camera flies toward a rebar cage as the user scrolls
// past the hero. Progressive enhancement only — the static hero image + CSS
// parallax (script.js) is the baseline and stays untouched underneath.

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
    return; // CDN unreachable — keep the static fallback, fail silently
  }

  const isNarrow = window.innerWidth < 768;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b1a2d, 8, 34);

  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setClearColor(0x0b1a2d, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isNarrow ? 1.5 : 2));

  // ===== Blueprint ground grid =====
  const grid = new THREE.GridHelper(70, 56, 0x0ea5a0, 0x15293f);
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
  const barMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });

  for (let i = 0; i < barCount; i++) {
    const angle = (i / barCount) * Math.PI * 2;
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    cage.add(bar);
  }

  const ringGeo = new THREE.TorusGeometry(radius, 0.025, 8, 32);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x0ea5a0, transparent: true, opacity: 0.85 });
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
  const scanMat = new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
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
  const particleMat = new THREE.PointsMaterial({ color: 0x0ea5a0, size: 0.05, transparent: true, opacity: 0.5 });
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

  let active = true;
  new IntersectionObserver((entries) => {
    active = entries[0].isIntersecting;
  }, { threshold: 0 }).observe(track);

  let ready = false;
  const startTime = performance.now();

  function tick() {
    requestAnimationFrame(tick);
    if (!active) return;

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
