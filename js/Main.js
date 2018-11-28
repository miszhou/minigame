// 主函数 小游戏入口
import DataBus from './DataBus.js'
import ResourcesLoader from './runtime/ResourcesLoader.js'
import BackGround from './runtime/BackGround.js'
import Land from './runtime/Land.js'
import Birds from './runtime/Birds.js'
import Restart from './runtime/Restart.js'
import UpPencil from './runtime/UpPencil.js'
import DownPencil from './runtime/DownPencil.js'
import Director from './Director.js'
import Music from './runtime/Music.js'
import Utils from './libs/Utils.js'

export default class Main {
  constructor(){
    // 之后创建的都是离屏画布
    // const canvas = wx.createCanvas()
    canvas.width = window.innerWidth * wx.getSystemInfoSync().pixelRatio
    canvas.height = window.innerHeight * wx.getSystemInfoSync().pixelRatio
    this.ctx = canvas.getContext('2d')
    this.databus = DataBus.getDataBus()
    this.databus.ctx = this.ctx
    this.databus.endgame = false
    this.databus.time = 1
    this.databus.score = 0
    this.databus.lock = false
    this.databus.ranklist = false
    this.databus.hiderank = false
    this.databus.utils = new Utils()
    this.loader = ResourcesLoader.getLoader()
    this.director = Director.getDirector()
    this.music = Music.getMusic()
    // 开放数据
    this.databus.openDataContext = wx.getOpenDataContext()
    this.databus.sharedCanvas = this.databus.openDataContext.canvas
    
    this.loader.onLoaded(map => this.firstLoad(map))
  }
  firstLoad(map){
    // 首次静态资源加载完成
    // 初始化页面
    this.databus.resources = map
    this.init()
    this.listenClick()
  }
  init(){
    this.databus.speed = 2
    this.databus.set('background', BackGround)
      .set('birds', Birds)
      .set('land', Land)
      .set('pencils', [])
      .set('restart', Restart)
    this.director.run()
  }
  listenClick() {
    // 监听点击屏幕事件
    wx.onTouchStart((e) => {
      if (!this.databus.endgame) {
        // 小鸟飞动
        this.databus.get('birds').sy = this.databus.get('birds').sy - 10
        this.databus.time = 1
        this.music.playFly()
      }else {
        // 点击开始按钮
        if (this.databus.get('restart').isCollideWith(e) && !this.databus.ranklist) {
          this.databus.endgame = false
          this.databus.hiderank = false
          this.databus.ranklist = false
          this.databus.score = 0
          this.init()
          this.music.playFly()
        }
        // 点击排行榜
        if (!this.databus.ranklist && this.databus.utils.isCollideWith({ x: (window.innerWidth - 100) / 2, y: 360,width:100,height:100},e,this.databus.endgame)) {
          this.databus.openDataContext.postMessage({
            command: 'getFCloudStorage'
          })
          this.databus.ranklist = true
          this.music.playFly()
        }
        // context.fillText("返回", background.x * map.get('ratio'), (map.get('innerHeight') - 100) * map.get('ratio'))
        // context.fillText("重新开始", (map.get('innerWidth') - fontsize * 4) * map.get('ratio'), (map.get('innerHeight') - 100) * map.get('ratio'))
        // 排行榜页 点击返回
        if (this.databus.ranklist && this.databus.utils.isCollideWith({ x: 50, y: window.innerHeight - 90, width: 40, height: 20 }, e, this.databus.endgame)) {
          this.databus.ranklist = false
          this.databus.openDataContext.postMessage({
            command: 'getMyCloudStorage'
          })
        }
        // 排行榜页 点击重新开始
        if (this.databus.ranklist && this.databus.utils.isCollideWith({ x: (window.innerWidth - 120), y: window.innerHeight - 90, width: 80, height: 20 }, e, this.databus.endgame)) {
          this.databus.endgame = false
          this.databus.ranklist = false
          this.databus.score = 0
          this.init()
          this.music.playFly()
        }
      }
    })
    // 监听音乐被暂停事件
    wx.onAudioInterruptionEnd(function () {
      this.music.playBgm()
    })
  }
}