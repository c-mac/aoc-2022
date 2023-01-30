export default class Five {
  data: string[];
  instructions: number[][];
  stacks: string[][];

  constructor(data) {
    this.data = data;
    this.instructions = [];
    this.stacks = [];
    this.parseData();
  }

  parseData() {
    const stackSize =
      this.data
        .find((x) => x.trimStart().startsWith("1"))
        ?.split("")
        ?.filter((x) => Number.isInteger(parseInt(x, 10))).length || 0;

    for (let i = 0; i < stackSize; i++) {
      this.stacks[i] = [];
    }

    for (let d of this.data) {
      const match = d.match(/move (\d*) from (\d*) to (\d*)/);
      if (match) {
        this.instructions.push(
          [match[1], match[2], match[3]].map((x) => parseInt(x, 10))
        );
      } else {
        for (let i = 0; i < stackSize; i++) {
          // 4 characters between each relevant stack, start on char 1
          const charStack = i * 4 + 1;
          if (d.charAt(charStack).match(/[A-Z]/)) {
            this.stacks[i].push(d.charAt(charStack));
          }
        }
      }
    }
    for (let i = 0; i < this.stacks.length; i++) {
      this.stacks[i] = this.stacks[i].reverse();
    }
  }

  moveItem(instruction: number[]) {
    for (let i = 0; i < instruction[0]; i++) {
      this.stacks[instruction[2] - 1].push(
        this.stacks[instruction[1] - 1].pop()
      );
    }
  }

  moveItemEnhanced(instruction: number[]) {
    if (instruction[0] === 1) {
      this.stacks[instruction[2] - 1].push(
        this.stacks[instruction[1] - 1].pop()
      );
    } else {
      const itemsToMove = this.stacks[instruction[1] - 1].splice(
        this.stacks[instruction[1] - 1].length - instruction[0],
        instruction[0]
      );
      this.stacks[instruction[2] - 1] =
        this.stacks[instruction[2] - 1].concat(itemsToMove);
    }
  }

  one() {
    for (let i of this.instructions) {
      this.moveItem(i);
    }
    return this.stacks.map((x, i, stacks) => stacks[i].pop()).join("");
  }

  two() {
    for (let i of this.instructions) {
      this.moveItemEnhanced(i);
    }
    return this.stacks.map((x, i, stacks) => stacks[i].pop()).join("");
  }
}
