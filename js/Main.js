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

export default class Main {
  constructor(){
    // 之后创建的都是离屏画布
    // const canvas = wx.createCanvas()
    this.ctx = canvas.getContext('2d')
    this.databus = DataBus.getDataBus()
    this.databus.ctx = this.ctx
    this.databus.endgame = false
    this.databus.time = 1
    this.databus.score = 0
    this.databus.lock = false
    this.loader = ResourcesLoader.getLoader()
    this.director = Director.getDirector()
    this.music = new Music.getMusic()
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
    wx.onTouchStart((e) => {
      this.databus.get('birds').sy = this.databus.get('birds').sy - 10
      this.databus.time = 1
      this.music.playFly()
      if (this.databus.endgame) {
        console.log('listenClick')
        this.databus.endgame = false
        this.databus.score = 0
        this.init()
      }
    })
    wx.onAudioInterruptionEnd(function () {
      this.music.playBgm()
    })
  }
}