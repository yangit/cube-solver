import cubes from './cubes';
import { type Angle, type Cell, type Cube, type CubeMatchInfo, type CubeSet, type Route, type Rule, type SolutionCell, type Solution, type MultiSolution, type CellRenderInfo } from './types';
import _ from 'lodash';
export const bidirectRule = (rule: Rule): Rule[] => {
  const result = [rule];

  if (rule.in.level === rule.out.level && rule.bidirect !== false) {
    result.push({ in: rule.out, out: rule.in });
  }
  return result;
};

export const flipRule = (rule: Rule): Rule => {
  const newRule: Rule = JSON.parse(JSON.stringify(rule));
  if (rule.in.level === 'a') {
    newRule.in.level = 'c';
  }
  if (rule.in.level === 'c') {
    newRule.in.level = 'a';
  }
  if (rule.out.level === 'a') {
    newRule.out.level = 'c';
  }
  if (rule.out.level === 'c') {
    newRule.out.level = 'a';
  }
  if (rule.in.side === 2) {
    newRule.in.side = 4;
  }
  if (rule.in.side === 4) {
    newRule.in.side = 2;
  }
  if (rule.out.side === 2) {
    newRule.out.side = 4;
  }
  if (rule.out.side === 4) {
    newRule.out.side = 2;
  }
  return newRule;
};

export const rotateRule = (angle: Angle) => (rule: Rule): Rule => {
  const increment = angle / 90;
  const newRule: Rule = JSON.parse(JSON.stringify(rule));
  if (angle === 0) {
    return newRule;
  }
  if (newRule.in.side >= 1 && newRule.in.side <= 4) {
    newRule.in.side += increment;
    newRule.in.side %= 4;
    if (newRule.in.side === 0) {
      newRule.in.side = 4;
    }
  }
  if (newRule.out.side >= 1 && newRule.out.side <= 4) {
    newRule.out.side += increment;
    newRule.out.side %= 4;
    if (newRule.out.side === 0) {
      newRule.out.side = 4;
    }
  }
  return newRule;
};

export const ruleToString = (rule: Rule): string => {
  return `${rule.in.level}${rule.in.side}->${rule.out.level}${rule.out.side}`;
};
export const cubeToString = (cube: Cube): string => {
  return `${cube.code}: ${cube.rules.map(ruleToString).join(', ')}`;
};

// console.log(cube1.rules.flatMap(bidirectRule).map(ruleToString));

export const isEqualRules = (rule1: Rule) => (rule2: Rule): boolean => {
  return rule1.in.level === rule2.in.level && rule1.in.side === rule2.in.side && rule1.out.level === rule2.out.level && rule1.out.side === rule2.out.side;
};

export const flipRotateAndCheckRule = ({ cube, rule, rotation, flipped }: { cube: Cube, rule: Rule, rotation: Angle, flipped: boolean }): boolean => {
  const flippedRotatedBidirectional = cube.rules.flatMap(bidirectRule).map(ruleLocal => flipped ? flipRule(ruleLocal) : ruleLocal).map(rotateRule(rotation));
  return flippedRotatedBidirectional.some(isEqualRules(rule));
};

export const findFlipRotations = (cube: Cube, rule: Rule): CubeMatchInfo => {
  const result: CubeMatchInfo = { isMatch: false, cubeCode: cube.code, flipRotations: [] };
  const bidirectionalRules = cube.rules.flatMap(bidirectRule);

  const angles: Angle[] = [0, 90, 180, 270];
  for (const rotation of angles) {
    const found = bidirectionalRules.map(rotateRule(rotation)).some(isEqualRules(rule));
    if (found) {
      result.isMatch = true;
      result.flipRotations.push({ cubeCode: cube.code, rotation, flipped: false });
    }
  }

  for (const rotation of angles) {
    const found = bidirectionalRules.map(flipRule).map(rotateRule(rotation)).some(isEqualRules(rule));
    if (found) {
      result.isMatch = true;
      result.flipRotations.push({ cubeCode: cube.code, rotation, flipped: true });
    }
  }

  return result;
};

export const findCubeToCellMatches = (cube: Cube, rules: Rule[]): CubeMatchInfo => {
  const result: CubeMatchInfo = { isMatch: false, cubeCode: cube.code, flipRotations: [] };
  const firstRuleMatch = findFlipRotations(cube, rules[0]);
  if (!firstRuleMatch.isMatch) {
    return result;
  }

  firstRuleMatch.flipRotations.forEach(({ flipped, rotation }) => {
    if (rules.every(rule => flipRotateAndCheckRule({ cube, rule, rotation, flipped }))) {
      result.isMatch = true;
      result.flipRotations.push({ cubeCode: cube.code, rotation, flipped });
    }
  });

  return result;
};
export const codeToCube = (code: string): Cube => {
  const cube = cubes[code];
  if (typeof cube === 'undefined') {
    throw new Error(`Cannot find cube with code ${code}`);
  }
  return cube;
};
export const findAllMatchesForCell = (cell: Cell, cubeSet: CubeSet): CubeMatchInfo[] => {
  const result: CubeMatchInfo[] = [];

  Object.keys(cubeSet.cubes).map(codeToCube).forEach(cube => {
    const match = findCubeToCellMatches(cube, cell.rules);
    if (match.isMatch) {
      result.push(match);
    }
  });
  return result;
};
const takeCubeFromSet = (cubeSet: CubeSet, cubeCode: string): string => {
  if (typeof cubeSet.cubes[cubeCode] !== 'number') {
    throw new Error('Cannot take cube from set because it was never there');
  }
  if (typeof cubeSet.usedCubes[cubeCode] !== 'number') {
    cubeSet.usedCubes[cubeCode] = 0;
  }
  if (cubeSet.usedCubes[cubeCode] === cubeSet.cubes[cubeCode]) {
    throw new Error(`Cannot take cube ${cubeCode} from set because stock is empty`);
  }
  cubeSet.usedCubes[cubeCode] += 1;
  cubeSet.remaningCubes[cubeCode] -= 1;
  return cubeCode;
};

const getBruteforceComplexity = (solution: MultiSolution): number => {
  return solution.map(({ cubeMatches }) => cubeMatches.length).reduce((acc, length) => acc * length, 1);
};

const countSingleCubeMatches = (solution: MultiSolution): number => {
  const count = solution.filter(({ cubeMatches }) => cubeMatches.length === 1).length;
  // console.log({ count });

  return count;
};

const tryAllCombinations = (arrays: string[][], cubeSet: CubeSet): string[] | null => {
  const pointers = new Array(arrays.length).fill(0); // array for the pointers, initialized as zero

  let done = false;
  while (!done) {
    // Logs the current combination
    const combination = arrays.map((array, i) => array[pointers[i]]);
    const success = checkProposedSolution(combination, cubeSet);
    // console.log(combination);
    if (success) {
      return combination;
    }

    for (let i = 0; i < pointers.length; i++) {
      if (pointers[i] < arrays[i].length - 1) {
        pointers[i]++;
        break; // If the pointer was successfully increased, break the loop
      } else if (i === pointers.length - 1) {
        done = true; // If all pointers are at max, we're done
      } else {
        // If the pointer is at max and there's another array, reset this pointer
        pointers[i] = 0;
      }
    }
  }
  return null;
};

const checkProposedSolution = (cubeCodes: string[], cubeSet: CubeSet): boolean => {
  // console.log(cubeCodes, cubeSet.remaningCubes);
  const neededCubes: Record<string, number> = {};
  cubeCodes.forEach(cubeCode => {
    if (typeof neededCubes[cubeCode] === 'undefined') {
      neededCubes[cubeCode] = 0;
    }
    neededCubes[cubeCode] += 1;
  });
  if (Object.keys(neededCubes).some(cubeCode => cubeSet.remaningCubes[cubeCode] < neededCubes[cubeCode])) {
    return false;
  }

  return true;
};

const bruteForceSolution = (multiCubeMatches: MultiSolution, cubeSet: CubeSet): Solution => {
  const sortedMultiCubeMatches = _.sortBy(multiCubeMatches, ({ cubeMatches }) => cubeMatches.length);
  const cubeCodes = sortedMultiCubeMatches.map(({ cubeMatches }) => cubeMatches.map(({ cubeCode }) => cubeCode));
  const result = tryAllCombinations(cubeCodes, cubeSet);
  if (result !== null) {
    console.log('bruteforce success', result);
    result.forEach(cubeCode => takeCubeFromSet(cubeSet, cubeCode));

    return result.map((cubeCode, index) => {
      const { rotation, flipped } = sortedMultiCubeMatches[index].cubeMatches[0].flipRotations[0];
      return { coordinates: sortedMultiCubeMatches[index].coordinates, cubeCode, rotation, flipped, cubeMatches: sortedMultiCubeMatches[index].cubeMatches };
    });
  }
  return [];
};

export const solveRoute = (route: Route, cubeSet: CubeSet): { solution: Solution, meta: CellRenderInfo[] } => {
  const result: Solution = [];
  // const singleCubeMatches: Solution = [];
  let multiCubeMatches: MultiSolution = [];
  // sort multi and single cube matches
  route.forEach(cell => {
    const cubeMatches = findAllMatchesForCell(cell, cubeSet);
    if (cubeMatches.length === 0) {
      throw new Error('Cannot find matching cube for cell, impossible');
    }
    multiCubeMatches.push({ coordinates: cell.coordinates, rotation: 0, flipped: false, cubeMatches });
  });

  // iteratively remove cubes which are easy to satisfy
  while (countSingleCubeMatches(multiCubeMatches) > 0) {
    multiCubeMatches = multiCubeMatches.filter(({ cubeMatches, coordinates }) => {
      if (cubeMatches.length === 1) {
        // console.log('cc', cubeMatches[0].cubeCode);

        takeCubeFromSet(cubeSet, cubeMatches[0].cubeCode);
        const { rotation, flipped } = cubeMatches[0].flipRotations[0];
        result.push({ coordinates, cubeCode: cubeMatches[0].cubeCode, rotation, flipped, cubeMatches });
        return false;
      }
      return cubeMatches.length > 1;
    });
    multiCubeMatches = multiCubeMatches.map((cellSolution) => {
      const newCubeMatches = cellSolution.cubeMatches.filter(({ cubeCode }) => cubeSet.remaningCubes[cubeCode] > 0);
      return {
        ...cellSolution,
        cubeMatches: newCubeMatches,
      };
    });
  }

  multiCubeMatches = _.sortBy(multiCubeMatches, ({ cubeMatches }) => cubeMatches.length);

  // calculate complexity and calculate cube orders
  const complexity = getBruteforceComplexity(multiCubeMatches);
  console.log('multi:', multiCubeMatches.map(({ cubeMatches }) => cubeMatches.map(({ cubeCode }) => cubeCode)));

  console.log({ complexity });
  if (complexity < 1000) {
    result.push(...bruteForceSolution(multiCubeMatches, cubeSet));
  } else {
    console.log(`Too complex ${complexity}`);
    // throw new Error(`Too complex ${complexity}`);
  }
  console.log({ multiCubeMatches });
  return { solution: result, meta: multiCubeMatches.map(({ coordinates }) => ({ coordinates, className: 'cubeMulti' })) };
};

export const renderSolution = ({ solution, meta }: { solution: Solution, meta: CellRenderInfo[] }): void => {
  const app = document.getElementById('app');
  const minX = solution.map(({ coordinates }) => coordinates.x).reduce((acc, x) => Math.min(acc, x), 0);
  const maxX = solution.map(({ coordinates }) => coordinates.x).reduce((acc, x) => Math.max(acc, x), 0);
  const minY = solution.map(({ coordinates }) => coordinates.y).reduce((acc, y) => Math.min(acc, y), 0);
  const maxY = solution.map(({ coordinates }) => coordinates.y).reduce((acc, y) => Math.max(acc, y), 0);
  const minZ = solution.map(({ coordinates }) => coordinates.z).reduce((acc, z) => Math.min(acc, z), 0);
  const maxZ = solution.map(({ coordinates }) => coordinates.z).reduce((acc, z) => Math.max(acc, z), 0);
  // z, y, x
  const layers: HTMLTableCellElement[][][] = [];

  for (let z = minZ; z <= maxZ; z++) {
    const layer: HTMLTableCellElement[][] = [];
    for (let y = minY; y <= maxY; y++) {
      const row: HTMLTableCellElement[] = [];
      for (let x = minX; x <= maxX; x++) {
        const cell = solution.find(({ coordinates }) => coordinates.x === x && coordinates.y === y && coordinates.z === z);
        const element = document.createElement('td');
        if (typeof cell !== 'undefined') {
          element.className = `cube-${cell.cubeCode}`;
        } else {
          const metaCell = meta.find(({ coordinates }) => coordinates.x === x && coordinates.y === y && coordinates.z === z);
          if (typeof metaCell !== 'undefined') {
            element.className = metaCell.className;
          } else {
            element.className = 'cubeNone';
            // check if there is a cube in the next layer
            for (let zi = z + 1; zi <= maxZ; zi++) {
              if (solution.find(({ coordinates }) => coordinates.x === x && coordinates.y === y && coordinates.z === zi) != null) {
                element.className = 'cube-1';
                break;
              }
            }
          }
        }
        row.push(element);
      }
      layer.push(row);
    }
    layers.push(layer);
  }

  // render table
  layers.forEach((layer, index) => {
    const layerTable = document.createElement('table');
    layerTable.className = `layer-${index}`;
    const header = document.createElement('th');
    header.innerText = `Layer ${index + 1}`;
    layerTable.appendChild(header);
    layer.forEach(row => {
      const newRow = document.createElement('tr');
      row.forEach(cell => {
        newRow.appendChild(cell);
      });
      layerTable.appendChild(newRow);
    });
    app?.prepend(layerTable);
  });
};
export const pathToRoute = (path: string): Route => {

};
