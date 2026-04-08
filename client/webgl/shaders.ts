// credit to MDN WebGL Tutorials for initial shaders

export const vertexSource = `
  #define PI 3.1415926538

  attribute float aIndex;
  attribute vec4 aSeed;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  // some of these should be integers
  int n = 50000;
  float diskFraction = 0.7;
  float maxRadius = 1.5;
  float rateOfCurvature = 4.0;
  float smearFactor = 1.2;
  float thicknessRatio = 0.05;
  int numArms = 2;
  float bulgeRadius = 0.5;
  float compressionFactor = 0.5;

  vec4 disk(vec4 seed) {
    float rSeed = seed[0], thetaSeed = seed[1], zSeed = seed[2];

    float thickness = thicknessRatio * maxRadius;
    float r = rSeed * maxRadius;

    float theta = 2.0 * PI * thetaSeed + sin(thetaSeed * 2.0 * float(numArms) * PI) / (float(numArms) * smearFactor) + r * rateOfCurvature;

    float z = zSeed * thickness - (thickness / 2.0);

    // convert to Cartesian
    float x = r * cos(theta);
    float y = r * sin(theta);

    return vec4(x, y, z, 1.0);
  }

  vec4 bulge(vec4 seed) {
    float r = seed[0] * bulgeRadius;
    float theta = seed[1] * PI;
    float phi = seed[2] * 2.0 * PI;

    // convert to Cartesian and compress along z-axis
    float x = r * sin(theta) * cos(phi);
    float y = r * sin(theta) * sin(phi);
    float z = r * cos(theta) * compressionFactor;

    return vec4(x, y, z, 1.0);
  }

  void main() {
    gl_PointSize = 1.0;

    vec4 position;

    if (aIndex / float(n) < diskFraction) {
      position = disk(aSeed);
    } else {
      position = bulge(aSeed);
    }

    gl_Position = uProjectionMatrix * uModelViewMatrix * position;
    vColor = aVertexColor;
  }

`;

export const fragmentSource = `
  varying lowp vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;