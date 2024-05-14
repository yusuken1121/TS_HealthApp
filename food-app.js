var Score = /** @class */ (function () {
    function Score() {
    }
    Object.defineProperty(Score.prototype, "totalScore", {
        get: function () {
            var foods = Foods.getInstance();
            return foods.activeElementScore.reduce(function (acc, cur) { return acc + cur; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Score.prototype.render = function () {
        document.querySelector(".score__number").textContent = String(this.totalScore);
    };
    Score.getInstance = function () {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    };
    return Score;
}());
var Food = /** @class */ (function () {
    function Food(element) {
        this.element = element;
        this.element.addEventListener("click", this.clickEventHandler.bind(this));
    }
    Food.prototype.clickEventHandler = function () {
        this.element.classList.toggle('food--active');
        var score = Score.getInstance();
        score.render();
    };
    return Food;
}());
var Foods = /** @class */ (function () {
    function Foods() {
        this.elements = document.querySelectorAll('.food');
        this._activeElements = [];
        this._activeElementsScore = [];
        this.elements.forEach(function (element) {
            new Food(element);
        });
    }
    Object.defineProperty(Foods.prototype, "activeElements", {
        get: function () {
            var _this = this;
            this._activeElements = [];
            this.elements.forEach(function (element) {
                if (element.classList.contains('food--active')) {
                    _this._activeElements.push(element);
                }
            });
            return this._activeElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Foods.prototype, "activeElementScore", {
        get: function () {
            var _this = this;
            this._activeElementsScore = [];
            this.activeElements.forEach(function (element) {
                var foodScore = element.querySelector('.food__score');
                if (foodScore) {
                    _this._activeElementsScore.push(Number(foodScore.textContent));
                }
            });
            return this._activeElementsScore;
        },
        enumerable: false,
        configurable: true
    });
    Foods.getInstance = function () {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    };
    return Foods;
}());
var foods = Foods.getInstance();
