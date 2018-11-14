// 精灵类 元素继承基类
import DataBus from '../DataBus.js'

export default class Sprite{

  constructor(img = null, x = 0, y = 0, width = 0, height = 0, sx = 0, sy = 0, screenWidth = window.innerWidth, screenHeight = window.innerHeight) {
    this.img = img
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.sx = sx
    this.sy = sy
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.databus = DataBus.getDataBus()
    // this.visible = true
  }
  draw(img = this.img, x = this.x, y = this.y, width = this.width, height = this.height, screenx = this.sx, screeny = this.sy, screenWidth = this.screenWidth, screenHeight = this.screenHeight){
    this.databus.ctx.drawImage(
      img,
      x,
      y,
      width,
      height,
      screenx,
      screeny,
      screenWidth,
      screenHeight
    )
  }
  // 返回image对象
  static getImage(key) {
    return DataBus.getDataBus().resources.get(key)
  }
}