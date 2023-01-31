export default class Five {
  data: string;
  instructions: number[][];
  stacks: string[][];

  constructor(data) {
    this.data = data;
  }

  isUnique(substring: string, n: number): boolean {
    const s = new Set();
    for (let i = 0; i < n; i++) {
      s.add(substring[i]);
    }

    return s.size === n;
  }

  one() {
    const iterations = 4;
    for (let i = 0; i < this.data.length - iterations; i++) {
      if (this.isUnique(this.data.substring(i, i + iterations), iterations)) {
        return i + iterations;
      }
    }
  }

  two() {
    const iterations = 14;
    for (let i = 0; i < this.data.length - iterations; i++) {
      if (this.isUnique(this.data.substring(i, i + iterations), iterations)) {
        return i + iterations;
      }
    }
  }
}
