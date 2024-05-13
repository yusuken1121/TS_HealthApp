class Score {
    get totalScore(){
        const foods = new Foods()
        return foods.activeElementScore.reduce((acc,cur) => acc + cur, 0);
    }
    render(){
        document.querySelector(".score__number")!.textContent = String(this.totalScore);
    }
}

class Food {
    constructor(public element: HTMLDivElement) {
        element.addEventListener("click", this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
        this.element.classList.toggle('food--active');
        const score = new Score();
        score.render();
    }
}

class Foods {
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
        this.elements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if(foodScore){
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        })
        return this._activeElementsScore
    }

    constructor(){
        this.elements.forEach(element => {
            new Food(element);
        })
    }
}

const foods = new Foods();
