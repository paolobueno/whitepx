import solve from './solve';
import {Array2D} from './Array2D';

interface Case {
  name: string;
  lines: number[][];
}
interface ValidCase extends Case {
  expected: number[][];
}

const validCases: ValidCase[] = [
  {
    name: 'Example',
    // prettier-ignore
    lines: [
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 1, 1, 0]
    ],
    // prettier-ignore
    expected: [
      [3, 2, 1, 0],
      [2, 1, 0, 0],
      [1, 0, 0, 1],
    ]
  },
  {
    name: 'Corner',
    // prettier-ignore
    lines: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,1],
    ],
    // prettier-ignore
    expected: [
      [6, 5, 4, 3],
      [5, 4, 3, 2],
      [4, 3, 2, 1],
      [3, 2, 1, 0],
    ]
  },
  {
    name: 'Middle',
    // prettier-ignore
    lines: [
      [0,1,0],
      [0,1,0],
      [0,0,0],
    ],
    // prettier-ignore
    expected: [
      [1, 0, 1],
      [1, 0, 1],
      [2, 1, 2],
    ]
  },
];

describe('solve', () => {
  validCases.forEach(c => {
    test(`Expected case ${c.name} to succeed`, () => {
      const width = c.lines[0].length;
      const height = c.lines.length;
      const p = new Array2D<number>(width, height);
      c.lines.forEach(l => p.pushLine(l));
      solve(p);
      expect(p.toLines()).toEqual(c.expected);
    });
  });
});
