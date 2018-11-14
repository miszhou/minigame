import Sprite from '../base/Sprite.js'
import DataBus from '../DataBus.js'
/**
 * 陆地类 继承自精灵基类
 */
export default class Land extends Sprite {
  constructor() {
    let img = Sprite.getImage('land')
    super(img, 0, 0, img.width, img.height, 0, window.innerHeight - img.height, img.width, img.height)
    this.img = img
    this.speed = DataBus.getDataBus().speed
    this.sx = 0
  }
  draw(){
    this.sx = this.sx - this.speed
    if (-this.sx + window.innerWidth >= this.img.width) {
      this.sx = 0
    }
    super.draw(this.img, 0, 0, this.img.width, this.img.height, this.sx, window.innerHeight - this.img.height, this.img.width, this.img.height)
  }
}
