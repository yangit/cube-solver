import { cubesArray } from "./cubes";

const cubeStyles = document.createElement('style');
document.head.appendChild(cubeStyles);
cubesArray.forEach(({ code, icon }, index) => {
    
    if (!icon) return;
    const rule = `
    .cube-${code} {
        border-color: black;
        border-width: 1px;
        background-image: url('${icon.file}');
        width: 120px;
        height: 174px;
        border-style: solid;
        background-position: -${icon.x * 224}px -${icon.y * 224}px;
    }`

    //@ts-expect-error typescript is not smart enough to know that this is not null
    cubeStyles.sheet.insertRule(rule, index);
})