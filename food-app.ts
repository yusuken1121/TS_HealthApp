interface Scoreable{
    readonly totalScore: number;
    render(): void;
}
interface Foodable {
    element: HTMLDivElement;
    clickEventHandler(): void;

}

interface Foodsable {
    elements: NodeListOf<HTMLDivElement>;
    readonly activeElements: HTMLDivElement[];
    readonly activeElementScore: number[];
}

class Score implements Scoreable{
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

class Food implements Foodable {
    constructor(public element: HTMLDivElement) {
        this.element.addEventListener("click", this.clickEventHandler.bind(this));
    }
    
    clickEventHandler(): void {
        this.element.classList.toggle('food--active');
        const score = Score.getInstance();
        score.render();
    }
}


class Foods implements Foodsable {
    private static instance: Foods;
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    private _activeElements: HTMLDivElement[] = []
    private _activeElementsScore: number[] = []
    get activeElements(){
        this._activeElements = [];
        this.elements.forEach(element => {
            if(element.classList.contains('food--active')){
                this._activeElements.push(element)
            }
        })
        return this._activeElements;
    }

    get activeElementScore(){
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if(foodScore){
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        })
        return this._activeElementsScore
    }

    private constructor(){
        this.elements.forEach(element => {
            new Food(element);
        })
    }
    static getInstance(){
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }

}

const foods = Foods.getInstance();
