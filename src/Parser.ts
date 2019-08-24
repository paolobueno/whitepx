import * as readline from 'readline';
import {Array2D} from './Array2D';
import {Problem} from './types';
import {EventEmitter} from 'events';

enum PARSER_STATE {
  T,
  N_M,
  LINES,
}

export class ParseError extends Error {}

export class Parser {
  private state: PARSER_STATE = PARSER_STATE.T;
  private currentCase?: Problem;
  private casesToParse = 0;
  private linesToParse = 0;
  private emitter = new EventEmitter();

  public cases: Problem[] = [];

  constructor(private stream: NodeJS.ReadableStream) {}

  on(name: 'end', listener: (p: Problem[]) => void): void;
  on(name: 'case', listener: (p: Problem) => void): void;
  on(name: string, listener: (p: any) => void): void {
    this.emitter.on(name, listener);
  }

  start(): void {
    const reader = readline.createInterface({
      input: this.stream,
    });
    reader.on('line', this.process.bind(this));
  }

  processT(str: string): void {
    try {
      const n = parseInt(str);
      this.casesToParse = n;
      this.cases = new Array(n);
      this.state = PARSER_STATE.N_M;
    } catch (e) {
      throw new ParseError(e.message);
    }
  }

  processNM(str: string): void {
    if (this.casesToParse <= 0) {
      throw new ParseError('Input has more cases than informed');
    }
    const splitNMLine = str.split(' ');
    if (splitNMLine.length > 3) {
      throw new ParseError('Malformed N M line');
    }
    try {
      const [height, width] = splitNMLine.map(c => parseInt(c));
      this.currentCase = new Array2D(width, height);
      this.cases.push(this.currentCase);
      this.linesToParse = height;
      this.casesToParse--;
      this.state = PARSER_STATE.LINES;
    } catch (e) {
      throw new ParseError(e.message);
    }
  }

  processLines(str: string): void {
    const line = str.split('').map(c => parseInt(c));
    if (!this.currentCase) {
      throw new ParseError('Invalid internal state');
    }
    this.currentCase.pushLine(line);
    this.linesToParse;
    if (this.linesToParse <= 0) {
      this.emitter.emit('case', this.currentCase);
      this.state = PARSER_STATE.N_M;
    }
  }

  process(str: string): void {
    switch (this.state) {
      case PARSER_STATE.T:
        this.processT(str);
        break;
      case PARSER_STATE.N_M:
        this.processNM(str);

        break;
      case PARSER_STATE.LINES:
        this.processLines(str);
        break;
    }
  }
}
