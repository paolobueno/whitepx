import {Coords} from './types';

export class Array2D<T> {
  public storage: T[];
  private pushedLine = 0;
  constructor(public width: number, public height: number) {
    if (width <= 0 || height <= 0) {
      throw new Error('width and height for Array2D should be greater than 0');
    }
    this.storage = new Array<T>(width * height);
  }
  pushLine(line: T[]): void {
    if (line.length !== this.width) {
      throw new Error('Line length must match Array2D width');
    }
    if (this.pushedLine >= this.height) {
      throw new Error('Array2D is full and cannot accept another line');
    }
    this.storage.splice(this.pushedLine * this.width, this.width, ...line);
    this.pushedLine++;
  }

  private validateBounds(x: number, y: number): void {
    if (x < 0 || x >= this.width) {
      throw new Error('X value out of bounds');
    }
    if (y < 0 || y >= this.height) {
      throw new Error('Y value out of bounds');
    }
  }
  private getIdx(x: number, y: number): number {
    return y * this.width + x;
  }
  getCoords(i: number): Coords {
    return [i % this.width, Math.floor(i / this.width)];
  }
  get(x: number, y: number): T {
    this.validateBounds(x, y);
    return this.storage[this.getIdx(x, y)];
  }
  set(x: number, y: number, value: T): void {
    this.validateBounds(x, y);
    this.storage[this.getIdx(x, y)] = value;
  }

  toLines(): T[][] {
    const lines = [];
    for (let i = 0; i < this.storage.length; i += this.width) {
      lines.push(this.storage.slice(i, i + this.width));
    }
    return lines;
  }
  toString(): string {
    return this.toLines()
      .map(line => line.join(' '))
      .join('\n');
  }

  find(predicate: (val: T) => boolean): Coords[] {
    const res: Coords[] = [];
    this.storage.forEach(
      (val, i) => predicate(val) && res.push(this.getCoords(i)),
    );
    return res;
  }
}
