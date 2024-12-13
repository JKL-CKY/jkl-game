//food类的定义
//1.坐标位置
//2.生成食物
//3.更新
class Food{
   constructor(select){
    this.map=document.querySelector(select)
    //创建食物合集
    this.foodList = [];
    this.createFood();
    this.foodPos();
   } 
   createFood() {
      const food = document.createElement('div');
      food.className = 'food';
      this.map.appendChild(food);
      this.foodList.push(food);
  }
   //随机坐标点
   foodPos(){
      for (const food of this.foodList) {
         const w = this.map.clientWidth / 20;
         const h = this.map.clientHeight / 20;
         let n1 = Math.floor(Math.random() * w);
         let n2 = Math.floor(Math.random() * h);
         const x = n1 * 20;
         const y = n2 * 20;
         food.style.left = x + 'px';
         food.style.top = y + 'px';
   }
}
   addFoodBasedOnScore(score) {
      if (score % 20 === 0 && score > 0) {
         this.createFood();
         this.foodPos();
      }
   }

}