import {Problem, Coords} from './types';

export const getNeighbours = (
  to: Coords,
  width: number,
  height: number,
): Coords[] => {
  const [x, y] = to;
  const res: Coords[] = [];
  // left
  if (x > 0) {
    res.push([x - 1, y]);
  }
  // right
  if (x < width - 1) {
    res.push([x + 1, y]);
  }
  // up
  if (y > 0) {
    res.push([x, y - 1]);
  }
  // down
  if (y < height - 1) {
    res.push([x, y + 1]);
  }
  return res;
};

class CoordSet {
  private set: Set<string>;
  private toStr(c: Coords) {
    return c.join('-');
  }
  private toCoords(s: string) {
    return s.split('-').map(x => parseInt(x)) as Coords;
  }
  constructor(values: Coords[]) {
    this.set = new Set(values.map(this.toStr));
  }
  pop(): Coords {
    const res = this.set.values().next().value;
    this.set.delete(res);
    return this.toCoords(res);
  }
  add(c: Coords) {
    this.set.add(this.toStr(c));
  }
  public get size(): number {
    return this.set.size;
  }
}

const visit = (boundary: CoordSet, problem: Problem) => {
  const target = boundary.pop();
  if (!target) {
    return;
  }
  const targetDistance = problem.get(target[0], target[1]);
  const neighbours = getNeighbours(target, problem.width, problem.height);
  neighbours.forEach(([x, y]) => {
    // skip already visited nodes
    if (problem.get(x, y) > -1) {
      return;
    }
    problem.set(x, y, targetDistance + 1);
    boundary.add([x, y]);
  });
};

export default (p: Problem) => {
  // Reset black pixels to -1 as special 'unvisited' value,
  // whites to 0 as final distance value
  p.storage.forEach((_, i) => p.storage[i]--);

  // Put neighbors of white pixels in boundary
  const boundary = new CoordSet(p.find(c => c === 0));
  while (boundary.size) {
    visit(boundary, p);
  }
  //
};
