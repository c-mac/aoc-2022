function intersection(setA, setB) {
  const _intersection = new Set();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

export default class Three {
    data: string[]
    
    constructor(data) {
        this.data = data;
    }
    // a = 97  (subtract 96)
    // A = 65  (subtract 38)
    one() {
        return this.data.reduce((prev, current) => {
            return prev + this.scoreCommonItem(current)
        }, 0)
    }

    two() {
        const sets = this.data.map((d) => new Set(d))
        let score = 0;
        for (let i = 0; i <= sets.length - 3; i += 3){
            score += this.scoreSets(sets[i], sets[i+1], sets[i+2])
        }
        return score
    }

    scoreCommonItem(sack: string) {
        // split sack into two compartments, build map
        const items = sack.split('');
        const compOne = items.slice(0, items.length / 2);
        const compTwo = items.slice(items.length / 2);

        const distinctItem = [...intersection(new Set(compOne), new Set(compTwo)).entries()][0][0];
        const itemScore = distinctItem === distinctItem.toUpperCase() ? distinctItem.charCodeAt(0) - 38 : distinctItem.charCodeAt(0) - 96;

        return itemScore
    }

    scoreSets(setA: Set<string>, setB: Set<string>, setC: Set<string>) {
        const distinctItem = [...intersection(intersection(setA, setB), setC).entries()][0][0];
        const itemScore = distinctItem === distinctItem.toUpperCase() ? distinctItem.charCodeAt(0) - 38 : distinctItem.charCodeAt(0) - 96;

        return itemScore;
    }
}