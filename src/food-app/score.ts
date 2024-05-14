import { Scoreable } from "./interface.js";
import { Foods } from "./foods.js";

export class Score implements Scoreable{
    private static instance: Score;
    get totalScore(){
        const foods = Foods.getInstance();
        return foods.activeElementScore.reduce((acc,cur) => acc + cur, 0);
    }
    render(){
        document.querySelector(".score__number")!.textContent = String(this.totalScore);
    }
    private constructor() {}
    static getInstance(){
        if(!Score.instance){
            Score.instance = new Score();
        }
        return Score.instance;
    }
}