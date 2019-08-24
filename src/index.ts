#!/usr/bin/env node

import {Parser} from './Parser';
import solve from './solve';

process.stdin.pause();
const parser = new Parser(process.stdin);
parser.on('end', cases => {
  cases.forEach(c => {
    solve(c);
    console.log(c.toString());
  });
});
parser.start();
