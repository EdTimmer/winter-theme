uniform float uTime;
uniform float uOffset;
varying vec2 vUvs;

void main() {
  gl_FragColor = vec4(1.0, vUvs, 0.5);
}