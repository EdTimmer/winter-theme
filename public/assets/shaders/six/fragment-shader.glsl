uniform float uTime;
uniform float uOffset;
varying vec2 vUvs;

void main() {
  gl_FragColor = vec4(vUvs.x, 1.0, vUvs.y / 2.0, 0.5);
}