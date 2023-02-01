const FILE_SIZE_CUTOFF = 100000;
const DIR_SIZE_TO_REMOVE = 30000000;

class Dir {
  name: string;
  size: number;
  dirs: Dir[];
  prevDir: Dir | undefined;

  constructor(name, prevDir) {
    this.name = name;
    this.prevDir = prevDir;
    this.size = 0;
    this.dirs = [];
  }
}

export default class Seven {
  data: string;
  currentDir: Dir;
  qualifiedSum: number;

  constructor(data) {
    this.data = data;
    this.currentDir = new Dir("/", undefined);
    this.qualifiedSum = 0;
  }

  bfs(dir: Dir, node: Dir) {
    let totalSize = 0;
    const visited = [];
    const queue = [];

    visited.push(node);
    queue.push(node);

    while (queue.length) {
      const s = queue.shift();

      if (s.size <= FILE_SIZE_CUTOFF) {
        totalSize += s.size;
      }

      for (let d of s.dirs) {
        if (!visited.includes(d)) {
          visited.push(d);
          queue.push(d);
        }
      }
    }
    return totalSize;
  }

  parseData() {
    let sum = 0;
    for (let d of this.data.slice(1)) {
      const fileMatch = d.match(/(\d*) [a-z][A-Z]*/);
      const cdMatch = d.match(/\$ cd (\S*)/);
      const dirMatch = d.match(/dir (\w*)/);

      if (d.startsWith("dir") && dirMatch) {
        this.currentDir.dirs.push(new Dir(dirMatch[1], this.currentDir));
      } else if (fileMatch && fileMatch[1]) {
        const fileSize = parseInt(fileMatch[1], 10);
        this.currentDir.size += fileSize;
      } else if (d.startsWith("$ cd") && cdMatch) {
        let dirToEnter;
        if (cdMatch[1] === "..") {
          dirToEnter = this.currentDir.prevDir;
          this.currentDir.prevDir.size += this.currentDir.size;
        } else {
          dirToEnter = this.currentDir.dirs.find(
            (dir) => dir.name === cdMatch[1]
          );
        }

        // console.log(`entering dir ${dirToEnter.name}`);
        this.currentDir = dirToEnter;
      }
    }
    // get root dir
    while (this.currentDir.prevDir) {
      this.currentDir = this.currentDir.prevDir;
    }
    console.log(this.currentDir.size);

    return this.bfs(this.currentDir, this.currentDir);
  }

  one() {
    return this.parseData();
  }

  two() {}
}
