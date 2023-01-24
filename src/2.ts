export default class Two {
    data: string[]
    shapes: {}

    constructor(data) {
        this.data = data;
        this.shapes = {
            'A': 1, // ROCK
            'X': 1,
            'B': 2, // PAPER
            'Y': 2,
            'C': 3, // SCISSORS
            'Z': 3
        };
    }


    one() {
        return this.data.reduce(
            (prev, curr) => {
                const players = curr.split(' ');
                const score = this.evaluateScore(players[0], players[1]);
                return prev + score;
            }
        , 0)
    }

    two() {
        return this.data.reduce(
            (prev, curr) => {
                const players = curr.split(' ');
                const score = this.evaluateScoreTwo(players[0], players[1]);
                return prev + score;
            }
        , 0)
    }

    evaluateScore(p1, p2) {
        if (p1 === 'A') { // ROCK
            if (p2 === 'X') {
                return 4; // draw
            } else if (p2 === 'Y') {
                return 8; // win
            } else {
                return 3; // loss
            }
        } else if (p1 === 'B') { // PAPER
            if (p2 === 'X') {
                return 1; // loss
            } else if (p2 === 'Y') {
                return 5; // draw
            } else {
                return 9; // win
            }
        } else { // SCISSORS
            if (p2 === 'X') { // win
                return 7;
            } else if (p2 === 'Y') { // loss
                return 2;
            } else { // draw
                return 6;
            }
        }
    }

    evaluateScoreTwo(opp, us) {
        if (opp === 'A') { // ROCK
            if (us === 'X') {
                return 3; // L with scissor
            } else if (us === 'Y') {
                return 4; // D with rock
            } else {
                return 8; // W with paper
            }
        } else if (opp === 'B') { // PAPER
            if (us === 'X') { // L with rock
                return 1;
            } else if (us === 'Y') { // D with paper
                return 5;
            } else { // W with scissors
                return 9;
            }
        } else { // SCISSORS
            if (us === 'X') { // L with paper
                return 2;
            } else if (us === 'Y') { // D with sci
                return 6;
            } else { // W with rock
                return 7;
            }
        }
    }


}