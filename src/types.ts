
// a is the top, b is the middle, c is the bottom
export type CubeLevel = 'a' | 'b' | 'c';

// 1 is the front, 2 is the right, 3 is the back, 4 is the left, 5 is the top, 6 is the bottom
export type CubeSide = 1 | 2 | 3 | 4 | 5 | 6;
export type Angle = 0 | 90 | 180 | 270;
export interface EntryOrExitPoint { level: CubeLevel, side: CubeSide }
export interface Rule { in: EntryOrExitPoint, out: EntryOrExitPoint, bidirect?: boolean };
export type BallPath = EntryOrExitPoint[];
export interface Cube { code: string, rules: Rule[], icon?: { file: string, x: number, y: number } }
export interface Coordinates {
  x: number
  y: number
  z: number
}
export interface Cell { coordinates: Coordinates, rules: Rule[] }
export interface CellRenderInfo { coordinates: Coordinates, className: string, text?: string }
export interface SolutionCell {
  coordinates: Coordinates
  cubeCode: string
  rotation: Angle
  flipped: boolean
  cubeMatches: CubeMatchInfo[]
}
export interface MultiSolutionCell {
  coordinates: Coordinates
  rotation: Angle
  flipped: boolean
  cubeMatches: CubeMatchInfo[]
}
export type Solution = SolutionCell[];
export type MultiSolution = MultiSolutionCell[];

export interface CubeSet {
  name: string
  cubeCount?: number
  cubes: Record<string, number>
  usedCubes: Record<string, number>
  remaningCubes: Record<string, number>
}
export interface CubeFlipRotataion {
  cubeCode: string
  rotation: Angle
  flipped: boolean
}
export interface CubeMatchInfo {
  isMatch: boolean
  cubeCode: string
  flipRotations: CubeFlipRotataion[]
}
export type Route = Cell[];
