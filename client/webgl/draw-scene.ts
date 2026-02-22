import { mat4 } from 'gl-matrix';

type ProgramInfo = {program: WebGLProgram, attribLocations: {[key: string]: number}, uniformLocations: {[key: string]: WebGLUniformLocation | null}};
type BufferObject = {seed: WebGLBuffer, color: WebGLBuffer};

export default function drawScene(gl: WebGLRenderingContext, programInfo: ProgramInfo, buffers: BufferObject, modelViewMatrix: mat4, n: number) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180;
  const aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  setSeedAttribute(gl, buffers, programInfo);
  setColorAttribute(gl, buffers, programInfo);

  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    const vertexCount = n;
    const offset = 0;
    gl.drawArrays(gl.POINTS, offset, vertexCount);
  }
}

function setSeedAttribute(gl: WebGLRenderingContext, buffers: BufferObject, programInfo: ProgramInfo) {
  const numComponents = 3;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.seed);
  gl.vertexAttribPointer(
    programInfo.attribLocations.seedData,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.seedData);
}

function setColorAttribute(gl: WebGLRenderingContext, buffers: BufferObject, programInfo: ProgramInfo) {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}