uniform float uVelocity;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 pos = position;
  pos.z = pos.z + sin(pos.x / 64.0 + uTime * uVelocity) * 64.0;
  vec4 worldPosition = modelMatrix * vec4( pos, 1.0 );
  vec4 mvPosition =  viewMatrix * worldPosition;
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
}