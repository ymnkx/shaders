import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import gsap from 'gsap';

export const SampleObjects = (scene: THREE.Scene) => {
  const group = new THREE.Group();

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uVelocity: {
        value: 2.0,
      },
      uPercent: {
        value: 0,
      },
      uTime: {
        value: 0,
      },
    },
    // wireframe: true,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(512, 512, 32, 32),
    shaderMaterial
  );
  plane.position.set(0, 0, 0);
  group.add(plane);
  scene.add(group);

  let isInvert = false;
  const handleToggle = () => {
    gsap.to(shaderMaterial.uniforms.uPercent, {
      value: isInvert ? 0 : 1,
      duration: 0.5,
      ease: 'power3.out',
    });
    isInvert = !isInvert;
  };
  document.body.addEventListener('click', handleToggle, { passive: true });

  const clock = new THREE.Clock();
  return {
    update: () => {
      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
    },
  };
};
