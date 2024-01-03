import _ from 'lodash';
import { type Cube } from './types';
const hasDuplicates = (array: string[]): boolean => {
  return (new Set(array)).size !== array.length;
};

export const cubesArray: Cube[] = [
  {
    code: '1',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 0, y: 0 },
    rules: [],
  },
  {
    code: '11v',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 1, y: 0 },
    rules: [
      { in: { level: 'a', side: 1 }, out: { level: 'b', side: 2 } },
      { in: { level: 'a', side: 2 }, out: { level: 'b', side: 2 } },
      { in: { level: 'a', side: 3 }, out: { level: 'b', side: 2 } },
      { in: { level: 'a', side: 4 }, out: { level: 'b', side: 2 } },
      { in: { level: 'a', side: 5 }, out: { level: 'b', side: 2 } },
      { in: { level: 'c', side: 1 }, out: { level: 'c', side: 2 }, bidirect: false },
      { in: { level: 'c', side: 3 }, out: { level: 'c', side: 2 }, bidirect: false },
    ],
  },
  {
    code: '25',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 2, y: 0 },
    rules: [
      { in: { level: 'a', side: 2 }, out: { level: 'a', side: 3 } },
      { in: { level: 'b', side: 1 }, out: { level: 'b', side: 3 } },
      { in: { level: 'c', side: 4 }, out: { level: 'c', side: 4 } },
    ],
  },
  {
    code: '26',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 3, y: 0 },
    rules: [
      { in: { level: 'a', side: 4 }, out: { level: 'a', side: 3 } },
      { in: { level: 'b', side: 1 }, out: { level: 'b', side: 3 } },
      { in: { level: 'c', side: 4 }, out: { level: 'c', side: 4 } },
    ],
  },
  {
    code: '30',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 0, y: 1 },
    rules: [
      { in: { level: 'a', side: 2 }, out: { level: 'a', side: 4 } },
      { in: { level: 'b', side: 2 }, out: { level: 'b', side: 4 } },
      { in: { level: 'c', side: 2 }, out: { level: 'c', side: 4 } },
    ],
  },
  {
    code: '35',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 1, y: 1 },
    rules: [
      { in: { level: 'a', side: 2 }, out: { level: 'a', side: 4 } },
      { in: { level: 'b', side: 2 }, out: { level: 'b', side: 4 } },
      { in: { level: 'c', side: 2 }, out: { level: 'c', side: 3 } },
    ],
  },
  {
    code: '36',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 2, y: 1 },
    rules: [
      { in: { level: 'a', side: 2 }, out: { level: 'a', side: 4 } },
      { in: { level: 'b', side: 2 }, out: { level: 'b', side: 4 } },
      { in: { level: 'c', side: 1 }, out: { level: 'c', side: 2 } },
    ],
  },
  {
    code: '43',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 3, y: 1 },
    rules: [
      { in: { level: 'a', side: 1 }, out: { level: 'a', side: 3 } },
      { in: { level: 'b', side: 2 }, out: { level: 'b', side: 3 } },
      { in: { level: 'c', side: 1 }, out: { level: 'c', side: 3 } },
    ],
  },
  {
    code: '45',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 0, y: 2 },
    rules: [
      { in: { level: 'a', side: 2 }, out: { level: 'a', side: 3 } },
      { in: { level: 'b', side: 2 }, out: { level: 'b', side: 3 } },
      { in: { level: 'c', side: 3 }, out: { level: 'c', side: 4 } },
    ],
  },
  {
    code: '46',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 1, y: 2 },
    rules: [
      { in: { level: 'a', side: 3 }, out: { level: 'a', side: 4 } },
      { in: { level: 'b', side: 3 }, out: { level: 'b', side: 4 } },
      { in: { level: 'c', side: 2 }, out: { level: 'c', side: 3 } },
    ],
  },
  {
    code: '77',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 2, y: 2 },
    rules: [
      { in: { level: 'a', side: 1 }, out: { level: 'a', side: 2 } },
      { in: { level: 'b', side: 1 }, out: { level: 'c', side: 3 } },
      { in: { level: 'b', side: 4 }, out: { level: 'c', side: 3 } },
    ],
  },
  {
    code: '78',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 3, y: 2 },
    rules: [
      { in: { level: 'a', side: 1 }, out: { level: 'a', side: 4 } },
      { in: { level: 'b', side: 1 }, out: { level: 'c', side: 3 } },
      { in: { level: 'b', side: 2 }, out: { level: 'c', side: 3 } },
    ],
  },
  {
    code: 'mk',
    icon: { file: 'cuboro_pro_funktionsgrafiken.png', x: 0, y: 3 },
    rules: [
      { in: { level: 'a', side: 1 }, out: { level: 'b', side: 5 } },
      { in: { level: 'a', side: 2 }, out: { level: 'b', side: 5 } },
      { in: { level: 'a', side: 3 }, out: { level: 'b', side: 5 } },
      { in: { level: 'a', side: 4 }, out: { level: 'b', side: 5 } },
      { in: { level: 'a', side: 5 }, out: { level: 'b', side: 5 } },
    ],

  },
];
hasDuplicates(cubesArray.map(c => c.code)) && console.error('Duplicate cube codes found');

export default _.keyBy(cubesArray, 'code');
