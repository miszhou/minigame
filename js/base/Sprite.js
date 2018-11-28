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
    this.ratio = wx.getSystemInfoSync().pixelRatio
  }
  draw(img = this.img, x = this.x, y = this.y, width = this.width, height = this.height, screenx = this.sx, screeny = this.sy, screenWidth = this.screenWidth, screenHeight = this.screenHeight){
    this.databus.ctx.drawImage(
      img,
      x,
      y,
      width,
      height,
      screenx * this.ratio,
      screeny * this.ratio,
      screenWidth * this.ratio,
      screenHeight * this.ratio
    )
  }
  /**
 * 简单的碰撞检测定义：
 * 点击点处于精灵所在的矩形内即可
 * @param{e} e: 触摸对象
 */
  isCollideWith(e) {
    let spX = e.touches[0].pageX
    let spY = e.touches[0].pageY

    if (!this.databus.endgame)
      return false
    return !!(this.sx <= spX
      && spX <= this.sx + this.screenWidth
      && spY >= this.sy
      && spY <= this.sy + this.screenHeight)
  }
  // 返回image对象
  static getImage(key) {
    return DataBus.getDataBus().resources.get(key)
  }
}