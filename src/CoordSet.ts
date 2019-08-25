import {Coords} from './types';

const coordsEq = (one: Coords) => (other: Coords) =>
  one[0] === other[0] && one[1] === other[1];

export class CoordSet {
  private storage: Array<Coords>;
  constructor(values: Coords[]) {
    this.storage = Array.from(values);
  }
  pop(): Coords | undefined {
    return this.storage.shift();
  }
  add(c: Coords) {
    if (this.storage.some(coordsEq(c))) {
      return;
    }
    this.storage.push(c);
  }
  public get size(): number {
    return this.storage.length;
  }
}
