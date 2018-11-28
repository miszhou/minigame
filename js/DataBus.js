// 全局数据管理器 单例模式
export default class DataBus{
  constructor(){
    this.map = new Map()
    this.ratio = wx.getSystemInfoSync().pixelRatio
  }
  set(key, value){
    if (typeof value === 'function'){
      value = new value()
    }
    this.map.set(key, value)
    return this
  }
  get(key){
    return this.map.get(key)
  }
  static getDataBus(){
    if (!DataBus.instance) {
      DataBus.instance = new DataBus()
    }
    return DataBus.instance
  }
  destory(){
    this.map.forEach((key)=>{
      this.map.set(key, null)
    })
  }
}