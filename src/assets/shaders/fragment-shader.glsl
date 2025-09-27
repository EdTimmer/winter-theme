uniform float uTime;
uniform float uOffset;

void main() {
  gl_FragColor = vec4(0.62 + sin(uTime * 1.0), 1.0 * sin(uOffset + uTime), 0.996 * uOffset, 0.5); // Red color
}