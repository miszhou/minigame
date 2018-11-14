import Pencil from './Pencil.js'
/**
 * 陆地类 继承自精灵基类
 */
export default class DownPencil extends Pencil {
  constructor(top) {
    let img = Pencil.getImage('downpen')
    let gap = window.innerHeight / 5
    super(img, top)
    this.gap = gap
  }
  draw() {
    super.draw(this.top + this.gap)
  }
}