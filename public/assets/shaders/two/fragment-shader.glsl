uniform float uTime;
uniform float uOffset;

void main() {
  gl_FragColor = vec4(0.62 * sin(uOffset + uTime), 1.0 + sin(uTime * 1.0), 0.996 * uOffset, 0.5); // Red color
}