varying vec2 vUv;
uniform float uPercent;

void main() {
  vec4 color = vec4( vUv.x, vUv.y, 0, 1.0 );
  vec4 invertedColor = vec4(1.0 - color.rgb, color.a);
  vec4 finalColor = mix(color, invertedColor, uPercent);

  if (!gl_FrontFacing) {
    finalColor.rgb *= 0.3;
  }

  gl_FragColor = finalColor;
}