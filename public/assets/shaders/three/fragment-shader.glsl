uniform float uTime;
uniform float uOffset;

void main() {
  gl_FragColor = vec4(0.62 * uOffset + sin(uTime * 1.0), 1.0, 0.996, 0.5);
}