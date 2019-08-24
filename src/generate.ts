#!/usr/bin/env node

import {Array2D} from './Array2D';

const whiteThresh = 0.01;

const randBetween = (min: number, max: number) =>
  Math.floor(Math.random() * max + min);

export const generate = (width: number, height: number) => {
  const res = new Array2D<number>(width, height);
  for (let i = 0; i < height; i++) {
    const line = Array.from({length: width}).map(() =>
      Math.random() > whiteThresh ? 0 : 1,
    );
    res.pushLine(line);
  }
  return `${height} ${width}
${res.toString().replace(/ /g, '')}`;
};

export const generateMultiple = (n: number) =>
  `${n}
${Array.from({length: n})
  .map(() => generate(randBetween(1, 182), randBetween(1, 182)))
  .join('\n')}`;
