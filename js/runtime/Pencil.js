import Sprite from '../base/Sprite.js'
import DataBus from '../DataBus.js'
/**
 * 陆地类 继承自精灵基类
 */
export default class Pencil extends Sprite {
  constructor(img, top) {
    super(img, 0, 0, img.width, img.height, window.innerWidth, top, img.width, img.height)
    this.img = img
    this.databus = DataBus.getDataBus()
    this.top = top
    this.sx = window.innerWidth
  }
  draw(sy = this.sy) {
    if (!this.databus.endgame) {
      this.sx = this.sx - this.databus.speed
    }
    this.sy = sy
    super.draw(this.img, this.x, this.y, this.width, this.height, this.sx, sy, this.width, this.height)
  }
}
