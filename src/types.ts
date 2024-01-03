
// a is the top, b is the middle, c is the bottom
export type CubeLevel = 'a' | 'b' | 'c';

// 1 is the front, 2 is the right, 3 is the back, 4 is the left, 5 is the top, 6 is the bottom
export type CubeSide = 1 | 2 | 3 | 4 | 5 | 6;
export type Angle = 0 | 90 | 180 | 270;
export interface Rule { in: { level: CubeLevel, side: CubeSide }, out: { level: CubeLevel, side: CubeSide }, bidirect?: boolean };

export interface Cube { code: string, rules: Rule[],icon?:{file:string,x:number,y:number} }
export interface Cell { coordinates: { x: number, y: number, z: number }, rules: Rule[] }
export interface CubeSet {
    name: string
    cubeCount?:number
    cubes: Record<string, number>
}
export interface CubeMatchRotataion {
    rotation: Angle
    flipped: boolean
}
export interface CubeMatchInfo {
    isMatch: boolean
    matches: CubeMatchRotataion[]
}
export type Route = Cell[];