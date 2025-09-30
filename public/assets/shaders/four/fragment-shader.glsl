uniform float uTime;
uniform float uOffset;
varying vec2 vUvs;

void main() {
  gl_FragColor = vec4(vUvs, 1.0, 0.5);
}