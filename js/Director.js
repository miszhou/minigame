// 全局逻辑控制器 单例模式
import DataBus from './DataBus.js'
import Music from './runtime/Music.js'
import UpPencil from './runtime/UpPencil.js'
import DownPencil from './runtime/DownPencil.js'

export default class Director {
  constructor() {
    this.databus = DataBus.getDataBus()
    this.music = Music.getMusic()
  }
  // 创建铅笔
  createPencils() {
    const minTop = window.innerHeight / 8
    const maxTop = window.innerHeight / 2
    const top = window.innerHeight / 8 + (maxTop - minTop) * Math.random()
    this.databus.get('pencils').push(new UpPencil(top))
    this.databus.get('pencils').push(new DownPencil(top))
  }
  // 绘制分数
  createScore() {
    //设置字体样式
    this.databus.ctx.font = "18px Courier New";
    //设置字体填充颜色
    this.databus.ctx.fillStyle = "green";
    //从坐标点(50,50)开始绘制文字
    this.databus.ctx.fillText(this.databus.score, 20, 20);
  }
  // 检测碰撞
  checkBoom(){
    const birdborder = {
      x: this.databus.get('birds').sx + this.databus.get('birds').screenWidth / 2,
      y: this.databus.get('birds').sy + this.databus.get('birds').screenHeight / 2,
      width: this.databus.get('birds').screenWidth - 20,
      height: this.databus.get('birds').screenHeight - 20
    }
    if ((birdborder.y + birdborder.height / 2) >= this.databus.get('land').sy) {
      this.databus.get('birds').sy = this.databus.get('land').sy - this.databus.get('birds').screenHeight
      
      this.databus.endgame = true
      
      return 
    }
    let pencils = this.databus.get('pencils')
    for (let i = 0; i < pencils.length; i++) {
      let pencilborder = {
        x: pencils[i].sx + pencils[i].screenWidth / 2,
        y: pencils[i].sy + pencils[i].screenHeight / 2,
        width: pencils[i].screenWidth,
        height: pencils[i].screenHeight
      }
      // 碰撞检测
      if (
        Math.abs(birdborder.x - pencilborder.x) < birdborder.width / 2 + pencilborder.width / 2 //横向判断
        &&
        Math.abs(birdborder.y - pencilborder.y) < birdborder.height / 2 + pencilborder.height / 2 //纵向判断
      ) {
        
        this.databus.endgame = true
        return
      }
    }
  }
  // 加分
  addScore(){
    if (this.databus.get('birds').sx - 10 > this.databus.get('pencils')[0].sx + this.databus.get('pencils')[0].width && !this.databus.lock){
      this.databus.score++
      // if (this.databus.score % 10 === 0) {
      //   this.databus.speed++
      // }
      this.databus.lock = true
    }
  }
  // 主程序页面渲染
  run(){
    // 碰撞检测
    this.checkBoom()
    if (!this.databus.endgame) {
      if (this.databus.get('pencils').length === 0) {
        this.createPencils()
      }
      // 当铅笔淡出屏幕左侧则从全局铅笔数组中删除
      if (this.databus.get('pencils')[0].sx + this.databus.get('pencils')[0].width <= 0 && this.databus.get('pencils').length === 4) {
        this.databus.lock = false
        this.databus.get('pencils').shift()
        this.databus.get('pencils').shift()
      }
      if (this.databus.get('pencils')[0].sx <= (window.innerWidth - this.databus.get('pencils')[0].width) / 2 && this.databus.get('pencils').length === 2) {
        this.createPencils()
      }
      this.databus.get('background').draw()
      // 绘制铅笔
      this.databus.get('pencils').forEach((value) => {
        value.draw()
      })
      // 绘制小鸟
      this.databus.get('birds').draw()
      // 绘制陆地
      this.databus.get('land').draw()
      // 加分检测
      this.addScore()
      // 绘制分数
      this.createScore()
      // 刷帧
      this.aniId = requestAnimationFrame(() => {
        this.databus.time = this.databus.time + 1
        this.databus.aniId = this.aniId
        this.run()
      })
    } else {
      cancelAnimationFrame(this.aniId)
      
      this.music.playExplosion()
      
      this.saveScoreToWx()
    }
  }
  // 绘制排行榜
  // 保存用户游戏数据到微信公享数据
  saveScoreToWx () {
    // 获取当前用户最高分
    let ratio = this.databus.ratio
    this.databus.sharedCanvas.width = window.innerWidth * ratio
    this.databus.sharedCanvas.height = window.innerHeight * ratio
    this.databus.openDataContext.postMessage({
      command: 'defaultData',
      newdata: [['newscore', this.databus.score.toString()], ['innerWidth', window.innerWidth], ['innerHeight', window.innerHeight], ['ratio', ratio]]
    })
    this.databus.openDataContext.postMessage({
      command: 'getMyCloudStorage'
    })
    
    this.bgmask()
    this.createShareCanvas()
  }
  // 游戏暂停状态绘制 点击排行榜时进行 开放域canvas绘制 排行榜显示 
  createShareCanvas(){
    // console.log('createShareCanvas')
    if (this.databus.endgame === true) {
      // console.log('待开始')
      this.databus.get('background').draw()
      // 绘制铅笔
      this.databus.get('pencils').forEach((value) => {
        value.draw()
      })
      // 绘制小鸟
      this.databus.get('birds').draw()

      // // 绘制陆地
      this.databus.get('land').draw()
      this.bgmask()
      this.databus.get('restart').draw()
      let ratio = this.databus.ratio
      this.databus.ctx.drawImage(this.databus.sharedCanvas, 0, 0, window.innerWidth * ratio, window.innerHeight * ratio, 0, 0, window.innerWidth, window.innerHeight);
      this.shareanid = requestAnimationFrame(this.createShareCanvas.bind(this));
    } else {
      // console.log('游戏开始')
      cancelAnimationFrame(this.shareanid)
    }
  }
  // 背景蒙版
  bgmask() {
    this.databus.ctx.globalAlpha = 0.3;
    this.databus.ctx.fillStyle = '#000'
    this.databus.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.databus.ctx.globalAlpha = 1;
  }
  static getDirector() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
}