// import Sprite from '../base/Sprite.js'
import Pencil from './Pencil.js'
/**
 * 陆地类 继承自精灵基类
 */
export default class UpPencil extends Pencil {
  constructor(top) {
    let img = Pencil.getImage('uppen')
    super(img, top)
  }
  draw() {
    super.draw(this.top - this.img.height)
  }
}