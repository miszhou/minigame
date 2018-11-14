import Sprite from '../base/Sprite.js'
/**
 * 重新开始类 继承自精灵基类
 */
export default class Restart extends Sprite {
  constructor() {
    let img = Sprite.getImage('restart')
    super(img, 0, 0, img.width, img.height, (window.innerWidth - img.width) / 2, (window.innerHeight - img.height) / 2, img.width, img.height)
  }
}