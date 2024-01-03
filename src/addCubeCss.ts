import { cubesArray } from './cubes';

const cubeStyles = document.createElement('style');
document.head.appendChild(cubeStyles);
const rules: string[] = [];
cubesArray.forEach(({ code, icon }, index) => {
  if (icon == null) return;
  const rule = `
    .cube-${code} {
        border-color: black;
        border-width: 1px;
        background-image: url('${icon.file}');
        width: 120px;
        height: 174px;
        border-style: solid;
        background-position: -${icon.x * 224}px -${icon.y * 224}px;
    }`;
  rules.push(rule);
});

rules.push(`
    .cubeNone {
        border-color: black;
        border-width: 1px;
        width: 120px;
        height: 174px;
        border-style: solid;
    }`);
rules.push(`
    .cubeSupport {
        border-color: black;
        background-color: #ccc;
        border-width: 1px;
        width: 120px;
        height: 174px;
        border-style: solid;
    }`);
// @ts-expect-error typescript is not smart enough to know that this is not null
rules.forEach((rule, index) => cubeStyles.sheet.insertRule(rule, index));
