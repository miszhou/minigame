export default class Utils {
  /**
  * 简单的碰撞检测定义：
  * 点击点处于精灵所在的矩形内即可
  * @param{e} e: 触摸对象
  * sp 有效区域对象
  */
  isCollideWith(sp, e, endgame) {
    // console.log(sp)
    // console.log(e)
    // console.log(endgame)
    let spX = e.touches[0].pageX
    let spY = e.touches[0].pageY
    // console.log(spX)
    // console.log(spY)
    if (!endgame)
      return false
    return !!(sp.x <= spX
      && spX <= sp.x + sp.width
      && spY >= sp.y
      && spY <= sp.y + sp.height)
  }
}