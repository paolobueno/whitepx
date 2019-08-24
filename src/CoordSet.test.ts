import {CoordSet} from './CoordSet';
CoordSet;

describe('CoordSet', () => {
  it('should initialize with an array of values', () => {
    const set = new CoordSet([[1, 1], [1, 2]]);
    expect(set.size).toBe(2);
  });
  it('should not grow with repeated values', () => {
    const set = new CoordSet([[1, 1], [1, 2]]);
    set.add([1, 1]);
    expect(set.size).toBe(2);
  });
  it('should allow for popping values', () => {
    const set = new CoordSet([[1, 1], [1, 2]]);
    expect(set.pop()).toEqual([1, 1]);
    expect(set.size).toBe(1);
  });
});
