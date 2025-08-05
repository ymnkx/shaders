import * as THREE from 'three';
import { SampleObjects } from './sampleObjects';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector(
  'canvas#this-is-canvas'
) as HTMLCanvasElement;
const scene = new THREE.Scene();

interface Sizes {
  width: number;
  height: number;
}

const sizes: Sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const isSetMaxSize = false;
const getCameraSize = (width: number, height: number) => {
  if (!isSetMaxSize) {
    return { width: width, height: height };
  }

  const maxSize = 1300;
  const aspectRatio = width / height;

  if (width > height) {
    return { width: maxSize, height: maxSize / aspectRatio };
  } else {
    return { width: maxSize * aspectRatio, height: maxSize };
  }
};

const cameraSize = getCameraSize(sizes.width, sizes.height);
const camera = new THREE.OrthographicCamera(
  -cameraSize.width / 2,
  cameraSize.width / 2,
  cameraSize.height / 2,
  -cameraSize.height / 2,
  -10000,
  10000
);
camera.position.set(1, 1, 1);
scene.add(camera);

// const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

window.addEventListener('resize', (): void => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  const newCameraSize = getCameraSize(sizes.width, sizes.height);
  camera.left = -newCameraSize.width / 2;
  camera.right = newCameraSize.width / 2;
  camera.top = newCameraSize.height / 2;
  camera.bottom = -newCameraSize.height / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;
// controls.minPolarAngle = Math.PI / 2.7;
// controls.maxPolarAngle = Math.PI / 2.5;
// controls.minAzimuthAngle = Math.PI / 3.25;
// controls.maxAzimuthAngle = Math.PI / 2.75;

const sampleObjects = SampleObjects(scene);

const tick = (): void => {
  sampleObjects.update();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
