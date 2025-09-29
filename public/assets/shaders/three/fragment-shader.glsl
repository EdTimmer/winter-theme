uniform float uTime;
uniform float uOffset;

void main() {
  gl_FragColor = vec4(0.62 + sin(uTime * 1.0), 1.0 * uOffset, 0.996 * cos(uOffset + uTime), 0.5); // Red color
}