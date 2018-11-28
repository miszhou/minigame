
export default class Utils {
  /**
  * 绘制圆角按钮区域
  * @param {CanvasContext} ctx canvas上下文
  * @param {number} x 圆角矩形选区的左上角 x坐标
  * @param {number} y 圆角矩形选区的左上角 y坐标
  * @param {number} w 圆角矩形选区的宽度
  * @param {number} h 圆角矩形选区的高度
  * @param {number} r 圆角的半径
  * @param {varf} drawtype 绘制方式 填充fill 还是描边绘制stroke 默认 fill
  */
  roundRect(ctx, x, y, w, h, r, drawtype='fill',color="#fff") {

    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    // ctx.setFillStyle('transparent')
    // ctx.setStrokeStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    // ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    ctx.lineTo(x + w, y + h - r)
    // ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    ctx.lineTo(x + r, y + h)
    // ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    ctx.lineTo(x, y + r)
    // ctx.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    if (drawtype === "fill"){
      ctx.fill()
      
    } else {
      ctx.stroke()
    }
    ctx.closePath()
    // 剪切
    ctx.clip()
    // 填充背景
    if (drawtype === "fill") {
      ctx.fillStyle = color
      ctx.fillRect(x, y, w, h)
    }
  }

  /**
  * 获取文字宽高
  * @param {CanvasContext} ctx canvas上下文
  * @param {number} text 待测量文本
  * @param {number} x 文本左下角 x坐标
  * @param {number} y 文本左下角 y坐标
  * @param {number} fontsize 文本字体大小
  * @param {number} lineheight 行高
  */
  textDetail(text, x, y, fontsize, lineheight){
    return {
      textlength: text.length,
      width: text.length * fontsize,
      height: lineheight
    }
  }

}