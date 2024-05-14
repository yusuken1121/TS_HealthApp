import { Score } from "./score.js";
import { Foodable } from "./interface.js";

export class Food implements Foodable {
    constructor(public element: HTMLDivElement) {
        this.element.addEventListener("click", this.clickEventHandler.bind(this));
    }
    
    clickEventHandler(): void {
        this.element.classList.toggle('food--active');
        const score = Score.getInstance();
        score.render();
    }
}