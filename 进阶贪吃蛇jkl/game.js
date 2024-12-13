//设计游戏类
class Game {
    constructor(select, scoreEle, gameover) {
        this.gameoverimg = document.querySelector(gameover)
        //地图
        this.map = document.querySelector(select)
        //食物
        this.food = new Food(select)
        //计分板
        this.scoreEle = document.querySelector(scoreEle)
        //蛇
        this.snake = new Snake(select)
        //定义计时器
        this.timer = 0
        //得分
        this.cunt = 0
        // 初始移动时间间隔（单位：毫秒
        this.intervalTime = 300;
        // 速度调整的分数阈值，每达到这个分数就加快速度
        this.speedThreshold = 10;
        // 每次达到阈值后减少的时间间隔
        this.timeReduce = 20;
    }
    //定义游戏开始的方法
    start() {
        this.gameoverimg.style.display = 'none'
        this.timer = setInterval(() => {
            //让蛇动起来
            this.snake.move()
            
            if (this.snake.isEat(this.food.foodList)) {
                this.snake.createHead()
                this.food.foodPos()
                // 通知 Food 类根据分数添加食物（可能会添加新食物）
                this.food.addFoodBasedOnScore(this.cunt);
                //得分增加
                this.score()
            }
            //判断蛇死没死
            if (this.snake.isDie()) {
                clearInterval(this.timer)
                this.gameoverimg.style.display = 'block'
            }
            if (this.gameoverimg.style.display == 'block') {
                start.disabled = true
                pause.disabled = true
                end.classList.add('endClass')
            }
        }, this.intervalTime)
    }    //暂停
    pause() {
        clearInterval(this.timer)
    }
    //重新开始
    restart() {
        window.location.reload()
    }
    //改变方向的方法
    change(type) {
        this.snake.direction = type
    }
    //得分
    score() {
        this.cunt += 10
        this.scoreEle.innerHTML = this.cunt
    
        // 检查得分是否达到速度调整阈值，若达到则加快速度
        if (this.cunt % this.speedThreshold === 0) {
            // 减少时间间隔，但要保证不会小于50毫秒（通过 Math.max 来控制最小值）
            this.intervalTime = Math.max(this.intervalTime - this.timeReduce, 50);
            // 如果当前正在游戏中（也就是计时器存在），重新设置计时器间隔来加快速度
            if (this.timer) {
                clearInterval(this.timer);
                this.start();
            }
        }
        // if(this.cunt>=20){
        //     this.food2 = new Food(select)
        // }
        
    }


}