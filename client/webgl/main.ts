import { mat4, vec3, quat } from "gl-matrix";

import drawScene from "./draw-scene";
import initBuffers from "./init-buffers";
import { vertexSource, fragmentSource } from "./shaders";

let x: number, y: number;
let isRotating = false;

const modelViewMatrix = mat4.create();
mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);

let numArms = 2;
let diskFraction = 0.7;
let diskRadius = 1.5;
let rateOfCurvature = 4;
let smearFactor = 1.2;
let thicknessRatio = 0.05;
let bulgeRadiusRatio = 0.33;
let compressionFactor = 0.5;

function loadShader(gl: WebGLRenderingContext, type: WebGLRenderingContextBase['VERTEX_SHADER'] | WebGLRenderingContextBase['FRAGMENT_SHADER'], source: string) {
  const shader = gl.createShader(type);

  if (shader === null) {
    console.error('Shader is null');
    gl.deleteShader(shader);
    return;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);

    return null;
  }

  return shader;
}

function initShaderProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  
  if (!vertexShader|| !fragmentShader) return null;

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(shaderProgram));
    gl.deleteProgram(shaderProgram);

    return null;
  }

  return shaderProgram;
}


function main(errorCb?: () => void) {
  const n = 50000;

  const canvas = document.getElementById('galaxy') as HTMLCanvasElement;

  const gl = canvas.getContext('webgl');

  if (gl === null) {
    console.error('Unable to get WebGL context.');
    if (errorCb) errorCb();
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const shaderProgram = initShaderProgram(gl, vertexSource, fragmentSource);

  if (!shaderProgram) {
    if (errorCb) errorCb();
    return;
  }

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      index: gl.getAttribLocation(shaderProgram, "aIndex"),
      seedData: gl.getAttribLocation(shaderProgram, "aSeed"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      n: gl.getUniformLocation(shaderProgram, "n"),
      diskFraction: gl.getUniformLocation(shaderProgram, "diskFraction"),
      diskRadius: gl.getUniformLocation(shaderProgram, "diskRadius"),
      rateOfCurvature: gl.getUniformLocation(shaderProgram, "rateOfCurvature"),
      smearFactor: gl.getUniformLocation(shaderProgram, "smearFactor"),
      thicknessRatio: gl.getUniformLocation(shaderProgram, "thicknessRatio"),
      numArms: gl.getUniformLocation(shaderProgram, "numArms"),
      bulgeRadiusRatio: gl.getUniformLocation(shaderProgram, "bulgeRadiusRatio"),
      compressionFactor: gl.getUniformLocation(shaderProgram, "compressionFactor"),
    },
  };

  const buffers = initBuffers(gl, n, diskFraction);

  function render() {
    drawScene(gl as WebGLRenderingContext, programInfo, buffers, modelViewMatrix, n, numArms, diskFraction, diskRadius, rateOfCurvature, smearFactor, thicknessRatio, bulgeRadiusRatio, compressionFactor);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function handleMouseDown(event: MouseEvent) {
  isRotating = true;
  x = event.offsetX;
  y = event.offsetY;
}

function handleMouseUp() {
  isRotating = false;
}

function handleMouseMove(event: MouseEvent) {
  if (isRotating) {
    const deltaX = event.offsetX - x;
    const deltaY = event.offsetY - y;

    // reset x and y for next mousemove event
    x = event.offsetX;
    y = event.offsetY;

    const screenAxis = vec3.fromValues(deltaY, deltaX, 0);
    const magnitude = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    vec3.normalize(screenAxis, screenAxis);

    const rotationQuat = quat.create();
    mat4.getRotation(rotationQuat, modelViewMatrix);
    quat.invert(rotationQuat, rotationQuat);

    const rotationAxis = vec3.create();
    vec3.transformQuat(rotationAxis, screenAxis, rotationQuat);

    mat4.rotate(
      modelViewMatrix,
      modelViewMatrix,
      magnitude / 100,
      rotationAxis
    );
  }
}

export const paramControls = [
  {
    name: "Radius of Disk",
    startingValue: diskRadius,
    min: 0,
    max: 10,
    step: 0.1,
    set: (value: number) => {diskRadius = value}
  },
  {
    name: "Thickness of Disk (relative to radius)",
    startingValue: thicknessRatio,
    min: 0,
    max: 1,
    step: 0.01,
    set: (value: number) => {thicknessRatio = value}
  },
  {
    name: "Number of Arms",
    startingValue: numArms,
    min: 0,
    max: 8,
    step: 1,
    set: (value: number) => {numArms = value}
  },
  {
    name: "Rate of Curvature of Spiral Arms",
    startingValue: rateOfCurvature,
    min: -10,
    max: 10,
    step: 0.1,
    set: (value: number) => {rateOfCurvature = value}
  },
  {
    name: "Width of Spiral Arms",
    startingValue: smearFactor,
    min: 0,
    max: 5,
    step: 0.1,
    set: (value: number) => {smearFactor = value}
  },
  {
    name: "Fraction of stars in disk",
    startingValue: diskFraction,
    min: 0,
    max: 1,
    step: 0.01,
    set: (value: number) => {diskFraction = value}
  },
  {
    name: "Bulge Radius (relative to disk)",
    startingValue: bulgeRadiusRatio,
    min: 0,
    max: 1,
    step: 0.01,
    set: (value: number) => {bulgeRadiusRatio = value}
  },
  {
    name: "Bulge Height (relative to bulge radius)",
    startingValue: compressionFactor,
    min: 0,
    max: 1,
    step: 0.01,
    set: (value: number) => {compressionFactor = value}
  }
];

export default main;
