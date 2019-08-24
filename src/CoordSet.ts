import {Coords} from './types';

const toCoords = (s: string) => {
  return s.split('-').map(x => parseInt(x)) as Coords;
};
const toStr = (c: Coords) => {
  return c.join('-');
};

export class CoordSet {
  private set: Set<string>;
  constructor(values: Coords[]) {
    this.set = new Set(values.map(toStr));
  }
  pop(): Coords {
    const res = this.set.values().next().value;
    this.set.delete(res);
    return toCoords(res);
  }
  add(c: Coords) {
    this.set.add(toStr(c));
  }
  public get size(): number {
    return this.set.size;
  }
}
