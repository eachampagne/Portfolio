export default function initBuffers(gl: WebGLRenderingContext, n: number, diskFraction: number) {
  const [positions, colors] = generateStars(n, diskFraction);

  const seedBuffer = initSeedBuffer(gl, positions);
  const colorBuffer = initColorBuffer(gl, colors);

  return {
    seed: seedBuffer,
    color: colorBuffer,
  };
}

function initSeedBuffer(gl: WebGLRenderingContext, positions: number[]) {
  const seedBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return seedBuffer;
}

function initColorBuffer(gl: WebGLRenderingContext, colors: number[]) {
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

// n: number of stars
// diskFraction: the fraction of the total stars in the disk. The rest of the stars are in the bulge.
function generateStars(n: number, diskFraction: number) {
  let positions = [] as number[], colors = [] as number[];

  const numDiskStars = Math.trunc(n * diskFraction);
  const numBulgeStars = n - numDiskStars;

  for (let i = 0; i < numDiskStars; i++) {
    const [r, theta, phi] = distributeDisk(1.5, 4, 1.2, 0.05, 2);

    const pos = cylindricalToCartesian([r, theta, phi]);
    const color = [1.0, 1.0, 1.0, 1.0];

    positions = [...positions, ...pos];
    colors = [...colors, ...color];
  }

  for (let i = 0; i < numBulgeStars; i++) {
    const pos = distributeBulge(0.5, 0.5);

    const color = [1.0, 1.0, 1.0, 1.0];

    positions = [...positions, ...pos];
    colors = [...colors, ...color];
  }

  return [positions, colors];
}

function cylindricalToCartesian([r, theta, z]: [r: number, theta: number, z: number]) {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);

  return [x, y, z];
}

function sphericalToCartesian([r, theta, phi]: [r: number, theta: number, phi: number]) {
  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = r * Math.sin(theta) * Math.sin(phi);
  const z = r * Math.cos(theta);

  return [x, y, z];
}

// maxRadius - radius of the whole galaxy
// rateOfCurvature - controls how tight the spiral arms are
// smearFactor - controls how "wide" the spiral arms are
// thicknessRatio - how thick the galaxy is, as a function of its radius
// numArms - how many spiral arms
function distributeDisk(maxRadius: number, rateOfCurvature: number, smearFactor: number, thicknessRatio: number, numArms: number = 2) {
  const thickness = thicknessRatio * maxRadius; // thickness of disk relative to radius

  const r = Math.random() * maxRadius;

  const thetaSeed = Math.random();

  // 2 pi thetaSeed - spreads the stars evenly around the disk
  // sin(2 pi numArms * thetaSeed) / (numArms * smearFactor) - makes the stars group together in spiral arms
  // r * rateOfCurvature - changes the angles of peak and trough density as r increase - "bends" the arms
  const theta = 2 * Math.PI  * thetaSeed + Math.sin(thetaSeed * 2 * numArms * Math.PI) / (numArms * smearFactor) + r * rateOfCurvature;

  const z = Math.random() * thickness - (thickness / 2);

  return [r, theta, z];
}

// maxRadius: radius of the bulge (before compressing)
// compressionFactor (< 1): - multiplies the z-height of the bulge to make it an ellipsoid
function distributeBulge(maxRadius: number, compressionFactor: number) {
  const r = Math.random() * maxRadius;
  const theta = Math.random() * Math.PI;
  const phi = Math.random() * 2 * Math.PI;

  const [x, y, z] = sphericalToCartesian([r, theta, phi]);

  return [x, y, z * compressionFactor];
}