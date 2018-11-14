import Sprite from '../base/Sprite.js'
import Director from '../Director.js'
import DataBus from '../DataBus.js'
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class Birds extends Sprite {
  constructor() {
    let img = Sprite.getImage('birds')
    let height = (window.innerHeight - img.height) * 2 / 5
    super(img, 0, 0, img.width / 3, img.height, 80, height, img.width / 3, img.height)
    this.director = Director.getDirector() 
    this.databus = DataBus.getDataBus() 
    this.birdindex = 0  
    this.sy = height
  }
  draw(){
    // 循环切换不同小鸟翅膀状态 仿飞动效果 存储一个小鸟初始横坐标数组
    this.birdsarr = [0, 10 + 34 + 9,10 + 34 + 18 + 34 + 9]
    if (this.director.aniId % 10 === 0) {
      if (this.birdindex == 2) {
        this.birdindex = 0
      } else {
        this.birdindex ++ 
      }
    }
    this.x = this.birdsarr[this.birdindex]
    this.sy = this.sy + parseInt((8 * (this.databus.time / 60) * (this.databus.time / 60)) / 2) - 1
    super.draw(this.img, this.x, 0, this.img.width / 3, this.img.height, 80, this.sy, this.img.width / 3, this.img.height)
  }
}