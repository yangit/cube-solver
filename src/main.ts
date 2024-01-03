import './addCubeCss';
import  { cuboroProSet } from './cubeSets';
import { cuboroProRoute } from './routes';
import { solveRoute } from './util';
const app = document.getElementById('app');

// cuboroProRoute
const solution = solveRoute(cuboroProRoute, cuboroProSet);
console.log(solution)
solution.forEach(cubeCode=> {
    // console.log(cubeCode);
    
    const newDiv = document.createElement('div');
    newDiv.className = `cube-${cubeCode}`
    app?.appendChild(newDiv);
    // console.log(app);
    
})
console.log({ cuboroProSet, cuboroProRoute })





// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
