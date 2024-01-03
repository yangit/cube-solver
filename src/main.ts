import './addCubeCss';
import { cuboroProSet } from './cubeSets';
import { cuboroProRoute } from './routes';
import { renderSolution, solveRoute } from './util';

const solution = solveRoute(cuboroProRoute, cuboroProSet);
console.log(solution);
renderSolution(solution);
