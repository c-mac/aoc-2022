export default class One {
    data: any[];

    constructor(data: any[]) {
        this.data = data;
    }

    one() {
        let currentMax = 0;
        let current = 0;
        for (let d of this.data) {
            if (Number.isNaN(Number.parseFloat(d))) {
                if (current > currentMax) {
                    currentMax = current;
                }
                current = 0;
            } else {
                current += d;
            }
        }

        return currentMax;
    }

    two() {
        const elfCalorieMap = {};
        let current = 0;
        for (let i = 0; i < this.data.length; i++) {
            const calories = this.data[i];
            if (Number.isNaN(Number.parseFloat(calories))) {
                elfCalorieMap[i] = current;
                current = 0;
            } else {
                current += calories;
            }
        }
        return Object.values(elfCalorieMap).sort((a,b) => b - a).slice(0, 3).reduce((prev, curr) => prev + curr, 0);
    }
}