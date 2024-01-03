import cubes from "./cubes";
import { Angle, Cell, Cube, CubeMatchInfo, CubeSet, Route, Rule } from "./types";

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

export const rotateRule = (angle: Angle ) => (rule: Rule): Rule => {
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

export const findMatchFlipRotations = (cube: Cube, rule: Rule): CubeMatchInfo => {
    const result: CubeMatchInfo = { isMatch: false, matches: [] };
    const bidirectionalRules = cube.rules.flatMap(bidirectRule);

    const angles: Angle[] = [0, 90, 180, 270];
    for (const rotation of angles) {
        const found = bidirectionalRules.map(rotateRule(rotation)).some(isEqualRules(rule));
        if (found) {
            result.isMatch = true;
            result.matches.push({ rotation, flipped: false });
        }
    }

    for (const rotation of angles) {
        const found = bidirectionalRules.map(flipRule).map(rotateRule(rotation)).some(isEqualRules(rule));
        if (found) {
            result.isMatch = true;
            result.matches.push({ rotation, flipped: true });
        }
    }

    return result;
};

export const findMatches = (cube: Cube, rules: Rule[]): CubeMatchInfo => {
    const result: CubeMatchInfo = { isMatch: false, matches: [] };
    const firstRuleMatch = findMatchFlipRotations(cube, rules[0]);
    if (!firstRuleMatch.isMatch) {
        return result;
    }

    firstRuleMatch.matches.forEach(({ flipped, rotation }) => {
        if (rules.every(rule => flipRotateAndCheckRule({ cube, rule, rotation, flipped }))) {
            result.isMatch = true;
            result.matches.push({ rotation, flipped });
        }
    });

    return result;
};
export const codeToCube = (code: string): Cube => {
    const cube = cubes[code]
    if (!cube) {
        throw new Error(`Cannot find cube with code ${code}`);
    }
    return cube;
}
export const findMatchingCubes = (cell: Cell, cubeSet:CubeSet): Cube[] => {
    return Object.keys(cubeSet.cubes).map(codeToCube).filter(cube => findMatches(cube, cell.rules).isMatch);
};
export const solveRoute = (route: Route, cubeSet: CubeSet): string[] => {
    // const usedCubeCount: Record<string, number> = {};

    const result = route.map(cell => {
        // // @ts-expect-error typescript is not smart enough to know that this is not null
        // const availableCubes: Cube[] = cubeSet.cubes.map(([cubeCode, count]) => {
        //     if (typeof usedCubeCount[cubeCode] === 'number') {
        //         if (usedCubeCount[cubeCode] >= count) {
        //             return null;
        //         }
        //     }
        //     return codeToCube(cubeCode);
        // }).filter(cube => cube !== null);

        const found = findMatchingCubes(cell, cubeSet).map(cube => cube.code);
        console.log('found',found);
        if (found.length>0){
            return found[0];
        }else
        {
            throw new Error('Cannot find matching cube for cell');
        }
       
    });
    // console.log(usedCubeCount);
    //// @ts-expect-error typescript is not smart enough to know that this is not null
    // const availableCubes: Cube[] = cubeSet.cubes.map(([cube, count]) => {
    //     if (typeof usedCubeCount[cube.code] === 'number') {
    //         if (usedCubeCount[cube.code] >= count) {
    //             return null;
    //         }
    //     }
    //     return cube;
    // }).filter(cube => cube !== null);
    // console.log(availableCubes);
    return result;
};