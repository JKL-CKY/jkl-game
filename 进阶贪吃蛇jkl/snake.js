//蛇对象
class Snake{
    constructor(select){
        this.map=document.querySelector(select)
        //蛇的运动方向
        this.direction="right"
        //蛇的数组(把蛇的头和身体存储)
        this.snakeList=[]
        //调用蛇头函数
        this.creatSnake()
        //this.move()
    }
    //创建蛇头函数
    createHead(){
        //获取数组当中的第0位找到蛇头
        const head = this.snakeList[0]
        const postion={x:0,y:0}
        if(head){
            //console.log("有蛇头");
            //如果有蛇头 创建新的蛇头放在原先蛇头后面的位置上
            //新蛇头坐标一定会发生改变
            switch(this.direction){
                case "left":
                    postion.x=head.offsetLeft-20
                    postion.y=head.offsetTop
                    break;
                case "right":
                    postion.x=head.offsetLeft+20
                    postion.y=head.offsetTop
                    break;
                case "top":
                    postion.x=head.offsetLeft
                    postion.y=head.offsetTop-20
                    break;
                case "bottom":
                    postion.x=head.offsetLeft
                    postion.y=head.offsetTop+20
                    break;
                default:
                    break;      
            }
            //需要把原先的蛇头变成身体
            head.className='body'
        }

        


        //
        const div = document.createElement("div")
        //定义样式
        div.className='head'
        //把蛇头存入数组
        this.snakeList.unshift(div)
        //给蛇头定义坐标
        div.style.left=postion.x+'px'
        div.style.top=postion.y+'px'
        //放到地图当中
        this.map.appendChild(div)
    }
    //创建蛇身函数
    creatSnake(){
        for(let i =0 ; i<4 ; i++){
            this.createHead()
        }
    }

    //蛇移动的方法
    move(){
        //思路是把原先头部坐标后面增加一个蛇头原本的蛇头变成身体，身体末尾删除一个
        const body=this.snakeList.pop() //pop删除数组中最后一个元素
        //从数组当中移除掉了
        //从页面中删除
        body.remove()

        //新增蛇头
        this.createHead()
    }

    //判断蛇吃到食物没
    isEat(foodList){
        //判断头跟坐标是否重合
        const head = this.snakeList[0];
        const headX = parseInt(head.style.left);
        const headY = parseInt(head.style.top);
        for (const food of foodList) {
            const foodX = parseInt(food.style.left);
            const foodY = parseInt(food.style.top);
            if (headX === foodX && headY === foodY) {
                return true;
            }
        }
        return false;
    }
    //判断蛇死没死
    isDie(){
        const head = this.snakeList[0]
        const headX = head.offsetLeft
        const headY = head.offsetTop

        if(headX<0||headY<0||headX>this.map.clientWidth||headY>this.map.clientHeight){
            alert('笨蛋，撞墙了')
            return true
        }
         // 遍历蛇身（从索引1开始，因为索引0是蛇头），检查蛇头是否碰到身体
         for (let i = 1; i < this.snakeList.length; i++) {
            const bodyPart = this.snakeList[i];
            const bodyX = bodyPart.offsetLeft;
            const bodyY = bodyPart.offsetTop;
            if (headX === bodyX && headY === bodyY) {
                alert('笨蛋，吃到自己了')
                return true;
            }
        }
        return false
    }
    
}