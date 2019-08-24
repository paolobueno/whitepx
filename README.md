# WHITE PX

This repository contains a CLI built with Typescript for solving the following
problem:

## Problem definition

Given a rectangular bitmap of size $n \times m$. Each pixel of the bitmap is
either white or black, but at least one is white. The pixel in $i$-th line and
$j$-th column is called the pixel $(i, j)$. The distance between two pixels
$p1=(i1, j1)$ and $p2=(i2, j2)$ is defined as $d(p1,p2) = |i1-i2| + |j1-j2|$.

Write a program which:

- reads the description of the bitmap from the standard input;
- for each pixel, computes the distance to the nearest white;
- writes the results to the standard output.

### Input

The number of test cases `t` $(1≤t≤1000)$ is in the first line of input, then
`t` test cases follow separated by an empty line. In the first line of each test
case there is a pair of integer numbers `n`, `m` separated by a single space,
$1<=n
<=182, 1<=m<=182$. In each of the following n lines of the test case
exactly one zero-one word of length `m`, the description of one line of the
bitmap, is written. On the `j`-th position in the line `i+1`,
$1 <= i <= n, 1 <= j <= m$, is `'1'` if, and only if the pixel $(i,j)$ is white.

### Output

In the `i`-th line for each test case, $1<=i<=n$, there should be written `m`
integers $f(i,1),...,f(i,m)$ separated by single spaces, where $f(i,j)$ is the
distance from the pixel $(i,j)$ to the nearest white pixel.

### Example:

Input:

```
1
3 4
0001
0011
0110
```

Output:

```
3 2 1 0
2 1 0 0
1 0 0 1
```

## Running this solution

### Dependencies

- [`node`](https://nodejs.org/): Tested with 12.x

Install code dependencies and run the solution on top of an example file with:

```bash
npm install
npm run build
node dist/index < fixtures/example.txt
```

Feel free to generate more examples through
```bash
node dist/generateCli 5 # value for `t`
```

## Approach description

### Algorithm

The problem establishes a
[manhattan distance metric](https://en.wikipedia.org/wiki/Taxicab_geometry)
between pixles, thus the bitmap can be seen as an undirected graph with nodes
connected with their immediate neighbours in the cardinal directions (N, S, E,
W) with weight `1`.

The distance of a given pixel to the nearest white pixel can then be determined
by a traversal of the graph with all the white pixels originally included as
traversal roots.

Since edge weights are positive and the same, there are no risks of arriving at
a new undiscovered node through a shorter route in the future, or initially
through an non-optimal route, thus the distances for each dark pixel can be
determined at the point they are included in the traversal boundary as their
known-distance neighbour's + 1.

### Data Structures

This solution utilizes a line-per-line streaming `Parser` state machine to parse
the problem from standard input into a simple `Array2D` implementation that
offers an interface for manipulating the parsed bitmap through 2 dimensional
coordinates while utilizing a single, preallocated JS array as underlying
memory.

Finally, the graph traversal boundary is implemented utilizing a `Set` of the
coordinates, leveraging it to prevent duplicates in `O(1)` over `O(n)` for a
regular array, however the coordinates need to be serialized to a `'x-y'` string
form since `[x, y]` object references are not considered equal and there's no
way to override its hashing function.

In the end I expect that the string serialization and parsing offsets the
benefits of the `Set`, though the implementation remains to illustrate other
small features, such as a getter property.
