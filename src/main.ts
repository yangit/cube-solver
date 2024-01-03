import './addCubeCss';
import { cuboroProSet } from './cubeSets';
import { cuboroProRoute } from './routes';
import { solveRoute } from './util';
const app = document.getElementById('app');

// cuboroProRoute
const solution = solveRoute(cuboroProRoute, cuboroProSet);
console.log(solution);
solution.forEach(({ cubeCode, coordinates, flipped, rotation }) => {
  const text = JSON.stringify({ ...coordinates, flipped: flipped || undefined, rotation });
  const newDiv = document.createElement('div');
  newDiv.className = `cube-${cubeCode}`;
  const newContent = document.createTextNode(text);
  newDiv.appendChild(newContent);
  app?.appendChild(newDiv);
});
