import {Parser, ParseError} from './Parser';
import {Readable} from 'stream';
import {Problem} from './types';

interface Case {
  name: string;
  text: string;
}
interface ValidCase extends Case {
  expected: number[][][];
}

const validCases: ValidCase[] = [
  {
    name: 'Example',
    text: `1
3 4
0001
0011
0110
`,
    // prettier-ignore
    expected: [
      [
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0]
      ]
    ]
  },
  {
    name: 'Multiple cases',
    text: `4
1 1
0
2 2
01
10
3 3
010
000
000
4 4
0000
0000
0000
0001
`,
    // prettier-ignore
    expected: [
      [
        [0]
      ],
      [
        [0,1],
        [1,0]
      ],
      [
        [0,1,0],
        [0,0,0],
        [0,0,0],
      ],
      [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,1],
      ]
    ]
  },
];

const invalidCases: Case[] = [
  {
    name: 'Width too small',
    text: `1
1 5
000`,
  },
  {
    name: 'Height too big',
    text: `2
3 3
000
000
010
000
000
1 1
1`,
  },
  {
    name: 'Too many cases',
    text: `1
1 1
1
3 3
000
010
000`,
  },
  {
    name: 'Malformed input',
    text: `
apoicuzpo
zxcv`,
  },
];

describe('Parser', () => {
  validCases.forEach(c => {
    test(`Expected case ${c.name} to succeed`, done => {
      const s = new Readable();

      // https://stackoverflow.com/a/22085851/2600345
      s._read = () => {};

      const p = new Parser(s);
      p.start();
      p.on('end', parsed => {
        parsed.forEach((problem, i) => {
          const fixture = c.expected[i];
          expect(problem.height).toBe(fixture.length);
          expect(problem.width).toBe(fixture[0].length);
          expect(problem.toLines()).toEqual(fixture);
        });
        done();
      });
      s.push(c.text);
    });
  });

  invalidCases.forEach(c => {
    test(`Expected case ${c.name} to throw`, () => {
      const s = new Readable();

      s._read = () => {};

      const p = new Parser(s);
      expect(() => c.text.split('\n').forEach(line => p.process(line))).toThrow(
        ParseError,
      );
    });
  });
});
