import { Foods } from "./foods.js";
export class Score {
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementScore.reduce((acc, cur) => acc + cur, 0);
    }
    render() {
        document.querySelector(".score__number").textContent = String(this.totalScore);
    }
    constructor() { }
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
