import { mat4, vec3, quat } from "gl-matrix";

import drawScene from "./draw-scene";
import initBuffers from "./init-buffers";
import { vertexSource, fragmentSource } from "./shaders";

let x: number, y: number;
let isRotating = false;

const modelViewMatrix = mat4.create();
mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);

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


function main() {
  const n = 1000;
  const diskFraction = 0.7;

  const canvas = document.getElementById('galaxy') as HTMLCanvasElement;

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  const gl = canvas.getContext('webgl');

  if (gl === null) {
    console.error('Unable to get WebGL context.');

    // TODO: image fallback

    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const shaderProgram = initShaderProgram(gl, vertexSource, fragmentSource);

  if (!shaderProgram) return;

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      seedData: gl.getAttribLocation(shaderProgram, "aSeed"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  const buffers = initBuffers(gl, n, diskFraction);

  function render() {
    drawScene(gl as WebGLRenderingContext, programInfo, buffers, modelViewMatrix, n);

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

export default main;
