import {Array2D} from './Array2D';

describe('Array2D', () => {
  it('should only accept lines with a valid width', () => {
    expect(() => new Array2D<number>(5, 1).pushLine([0, 0, 0])).toThrow();
    expect(() => new Array2D<number>(1, 1).pushLine([0, 0, 0])).toThrow();
    expect(() => new Array2D<number>(3, 1).pushLine([0, 0, 0])).not.toThrow();
  });
  it('should only accept a correct number of lines', () => {
    expect(() => {
      const arr = new Array2D<number>(1, 1);
      arr.pushLine([0]);
      arr.pushLine([0]);
    }).toThrow();

    expect(() => {
      const arr = new Array2D<number>(1, 1);
      arr.pushLine([0]);
    }).not.toThrow();
  });

  it('should return the correct value', () => {
    const arr = new Array2D<number>(3, 3);
    arr.pushLine([0, 0, 0]);
    arr.pushLine([0, 1, 0]);
    arr.pushLine([0, 0, 0]);
    expect(arr.get(0, 0)).toBe(0);
    expect(arr.get(1, 1)).toBe(1);

    expect(() => arr.get(5, 5)).toThrow();
  });
  it('should be able to set values', () => {
    const arr = new Array2D<number>(3, 3);
    arr.pushLine([0, 0, 0]);
    arr.pushLine([0, 1, 0]);
    arr.pushLine([0, 0, 0]);

    expect(arr.get(0, 0)).toBe(0);
    arr.set(0, 0, 1);
    expect(arr.get(0, 0)).toBe(1);

    expect(arr.get(1, 2)).toBe(0);
    arr.set(1, 2, 1);
    expect(arr.get(1, 2)).toBe(1);

    expect(() => arr.set(5, 5, 1)).toThrow();
  });

  it('should return the correct internal representation', () => {
    const arr = new Array2D<number>(3, 3);
    arr.pushLine([0, 0, 0]);
    arr.pushLine([0, 1, 0]);
    arr.pushLine([0, 0, 0]);

    expect(arr.toLines()).toEqual([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
  });

  it('should return correct coordinates for linear index', () => {
    const arr = new Array2D<number>(3, 3);
    expect(arr.getCoords(1)).toEqual([1, 0]);
    expect(arr.getCoords(2)).toEqual([2, 0]);
    expect(arr.getCoords(3)).toEqual([0, 1]);

    const arr2 = new Array2D<number>(5, 5);
    expect(arr2.getCoords(12)).toEqual([2, 2]);
  });

  it('should be able to find coordinates for values', () => {
    const arr = new Array2D<number>(3, 3);
    arr.pushLine([0, 1, 1]);
    arr.pushLine([1, 0, 0]);
    arr.pushLine([0, 0, 1]);
    expect(arr.find(v => v === 1)).toEqual([[1, 0], [2, 0], [0, 1], [2, 2]]);
  });
});
