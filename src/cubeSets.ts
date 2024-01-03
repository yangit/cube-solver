import { type CubeSet } from './types';

export const cuboroProSet: CubeSet = {
  name: 'Cuboro Pro',
  cubes: {
    1: 2,
    '11v': 2,
    25: 1,
    26: 1,
    30: 1,
    35: 1,
    36: 1,
    43: 2,
    45: 1,
    46: 1,
    77: 1,
    78: 1,
    mk: 1,
  },
  usedCubes: {},
  remaningCubes: {},
};
const cubeSets = [cuboroProSet];

cubeSets.forEach(cubeSet => {
  cubeSet.cubeCount = Object.values(cubeSet.cubes).reduce((a, b) => a + b, 0);
  cubeSet.remaningCubes = { ...cubeSet.cubes };
});

export default cubeSets;
