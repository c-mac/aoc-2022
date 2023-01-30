export default class Four {
  data: string[];

  constructor(data) {
    this.data = data;
  }

  one() {
    return this.data.reduce((prev, curr) => {
      return prev + this.isFullyContained(curr);
    }, 0);
  }

  two() {
    return this.data.reduce((prev, curr) => {
      return prev + this.isOverlap(curr);
    }, 0);
  }

  isFullyContained(schedule: string) {
    const times = schedule
      .split(",")
      .map((x) => x.split("-").map((x) => parseInt(x, 10)));
    if (times[0][0] <= times[1][0] && times[0][1] >= times[1][1]) {
      return 1;
    } else if (times[1][0] <= times[0][0] && times[1][1] >= times[0][1]) {
      return 1;
    }
    return 0;
  }

  isOverlap(schedule: string) {
    const times = schedule
      .split(",")
      .map((x) => x.split("-").map((x) => parseInt(x, 10)));
    if (times[0][1] >= times[1][0] && times[0][0] <= times[1][1]) {
      return 1;
    } else if (times[0][0] <= times[1][0] && times[0][1] >= times[1][0]) {
      return 1;
    }
    return 0;
  }
}
