// credit to MDN WebGL Tutorials for initial shaders

export const vertexSource = `
  attribute vec4 aSeed;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = uProjectionMatrix * uModelViewMatrix * aSeed;
    vColor = aVertexColor;
  }

`;

export const fragmentSource = `
  varying lowp vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;