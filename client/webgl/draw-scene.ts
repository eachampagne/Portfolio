import { mat4 } from 'gl-matrix';

type ProgramInfo = {program: WebGLProgram, attribLocations: {[key: string]: number}, uniformLocations: {[key: string]: WebGLUniformLocation | null}};
type BufferObject = {index: WebGLBuffer, seed: WebGLBuffer, color: WebGLBuffer};

export default function drawScene(
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: BufferObject,
  modelViewMatrix: mat4,
  n: number,
  numArms: number,
  diskFraction: number,
  diskRadius: number,
  rateOfCurvature: number,
  smearFactor: number,
  thicknessRatio: number,
  bulgeRadiusRatio: number,
  compressionFactor: number
) {
  // adjust buffer size to displayed size
  // https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
  gl.canvas.width = (gl.canvas as HTMLCanvasElement).clientWidth;
  gl.canvas.height = (gl.canvas as HTMLCanvasElement).clientHeight;

  // reset viewport to accommodate new width and height
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

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

  setIndexAttribute(gl, buffers, programInfo);
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

  gl.uniform1i(
    programInfo.uniformLocations.n,
    n
  );
  gl.uniform1i(
    programInfo.uniformLocations.numArms,
    numArms
  );

  gl.uniform1f(
    programInfo.uniformLocations.diskFraction,
    diskFraction
  );
  gl.uniform1f(
    programInfo.uniformLocations.diskRadius,
    diskRadius
  );

  gl.uniform1f(
    programInfo.uniformLocations.rateOfCurvature,
    rateOfCurvature
  );

  gl.uniform1f(
    programInfo.uniformLocations.smearFactor,
    smearFactor
  );

  gl.uniform1f(
    programInfo.uniformLocations.thicknessRatio,
    thicknessRatio
  );

  gl.uniform1f(
    programInfo.uniformLocations.bulgeRadiusRatio,
    bulgeRadiusRatio
  );

  gl.uniform1f(
    programInfo.uniformLocations.compressionFactor,
    compressionFactor
  );

  {
    const vertexCount = n;
    const offset = 0;
    gl.drawArrays(gl.POINTS, offset, vertexCount);
  }
}

function setIndexAttribute(gl: WebGLRenderingContext, buffers: BufferObject, programInfo: ProgramInfo) {
  const numComponents = 1;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.index);
  gl.vertexAttribPointer(
    programInfo.attribLocations.index,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.index);
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