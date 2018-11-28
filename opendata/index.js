import Utils from './Utils.js'

let sharedCanvas = wx.getSharedCanvas()
let context = sharedCanvas.getContext('2d')
let datalist = {}
let map = new Map()
let sharemap = new Map()
let utils = new Utils()
let background = {
  x: 30,
  y: 100,
  color: '#808080',
  lineheight: 40
}

let img = {
  'imgsrc': '',
  'x': 0,
  'y': 0,
  'width': 0,
  'height': 0,
  'sx': 0,
  'sy': 0,
  'screenWidth': 0,
  'screenHeight': 0,
}

function createImg(imgsrc = img.imgsrc, x = img.x, y = img.y, width = img.width, height = img.height, sx = img.sx, sy = img.sy, screenWidth = img.screenWidth, screenHeight = img.screenHeight) {
  let image = wx.createImage()
  image.src = imgsrc
  context.drawImage(image, x, y, width, height, sx, sy, screenWidth, screenHeight)
}
// 排行榜
function drawRankList(data) {
  
  // 图片加载
  data.forEach((item, index) => {
    let image = wx.createImage()
    image.src = item.avatarUrl
    item.faceimg = image
  })
  datalist = data
  onLoaded(data => drawList(data))
}

// 实际排行榜绘制
function drawList(datalist){
  // 背景绘制
  // 画标题
  context.fillStyle = '#fff';
  context.font = 24* map.get('ratio')+'px Arial';
  context.fillText('好友排行榜', (map.get('innerWidth') - 120) / 2 * map.get('ratio'), 80 * map.get('ratio'))
  context.save()
  utils.roundRect(context, 30 * map.get('ratio'), 100 * map.get('ratio'), (map.get('innerWidth') - 60) * map.get('ratio'), (100) * map.get('ratio'), 4 * map.get('ratio'), "fill", "#606060")
  datalist.sort(compare('KVDataList'))
  let fontsize = 16 * map.get('ratio')
  datalist.forEach((item, index) => {
    item.index = index
    context.font = fontsize + "px Courier New bold";
    //设置字体填充颜色
    context.fillStyle = "white"
    context.fillText(item.index + 1, (background.x + 24) * map.get('ratio'), (background.y + 40 + index * background.lineheight) * map.get('ratio'), 10 * map.get('ratio'))
    context.drawImage(item.faceimg, 0, 0, item.faceimg.width, item.faceimg.height, (background.x + 60) * map.get('ratio'), (background.y + 20 + index * background.lineheight) * map.get('ratio'), 30 * map.get('ratio'), 30 * map.get('ratio'))
    context.fillText(item.nickname, (background.x + 110) * map.get('ratio'), (background.y + 40 + index * background.lineheight) * map.get('ratio'), 150 * map.get('ratio'))
    context.fillText(item.KVDataList[0].value, (map.get('innerWidth') - 80) * map.get('ratio'), (background.y + 40 + index * background.lineheight) * map.get('ratio'), 20 * map.get('ratio'))
  })
  context.restore()
  context.save()
  utils.roundRect(context, 30 * map.get('ratio'), (map.get('innerHeight') - 100) * map.get('ratio'), (map.get('innerWidth') - 60) * map.get('ratio'), (50) * map.get('ratio'), 4 * map.get('ratio'), "fill", "#606060")
  context.fillStyle = "white"
  fontsize = 16 * map.get('ratio')
  context.font = fontsize + "px Courier New bold";
  context.fillText("返回", (background.x + 20) * map.get('ratio'), (map.get('innerHeight') - 70) * map.get('ratio'))
  context.fillText("重新开始", (map.get('innerWidth') - background.x - 20) * map.get('ratio') - fontsize * 4, (map.get('innerHeight')- 70) * map.get('ratio'))
  context.restore()
}

// 分数排序
function compare(property) {
  return function (a, b) {
    var value1 = a[property][0].value;
    var value2 = b[property][0].value;
    return value2 - value1;
  }
}

// 加载图片
function onLoaded(callback) {
  let loadcount = 0
  datalist.forEach((item, index) => {
    item.faceimg.onload = () => {
      loadcount++
      if (loadcount >= datalist.length) {
        return callback(datalist)
      }
    }
  })
}

// 获取当前用户数据
function getMyCloudStorage(){
  context.clearRect(0, 0, map.get("innerWidth") * map.get("ratio"), map.get("innerHeight") * map.get("ratio"))
  wx.getUserCloudStorage({
    keyList: ['score', 'uptime'], // 你要获取的、托管在微信后台的key
    success: res => {
      // 更新云数据最新记录
      if (res.KVDataList.length === 0 || parseFloat(res.KVDataList[0].value) < parseFloat(map.get('newscore'))) {
        setMyCloudStorage()
      } 
      // context.save()
      // 绘制本次得分
      let text = '本次得分：' + map.get('newscore')
      let fontsize = 30
      // utils.roundRect(context, (map.get('innerWidth') - text.length * fontsize) / 2 * map.get('ratio'), 20 * map.get('ratio'), text.length * fontsize * map.get('ratio'), 40 * map.get('ratio'), 10 * map.get('ratio'))
      // context.textAlign = "center"
      context.font = fontsize * map.get('ratio') +"px Courier New bold"
      //设置字体填充颜色
      context.fillStyle = "white";
      context.fillText(text, (map.get('innerWidth') - text.length*fontsize)/2 * map.get('ratio'), 80 * map.get('ratio'))
      // context.restore()

      text = "查看排行榜"
      fontsize = 20
      context.font = fontsize * map.get('ratio') + "px Courier New bold";
      // 排行榜按钮
      context.fillText(text, (map.get('innerWidth') - text.length* fontsize) / 2 * map.get('ratio'), 450 * map.get('ratio'))
    }
  })
}

// 更新当前用户数据
function setMyCloudStorage() {
  wx.setUserCloudStorage({
    KVDataList: [
      { key: 'score', value: map.get('newscore') }, { key: 'uptime', value: new Date().getTime().toString() }],
    success: res => {
      console.log(res)
    },
    fail: res => {
      console.log(res);
    }
  });
}

// 获取好友排行榜
function getFCloudStorage() {
  // 获取排行榜好友数据
  context.clearRect(0, 0, map.get("innerWidth") * map.get("ratio"), map.get("innerHeight") * map.get("ratio"))
  wx.getFriendCloudStorage({
    keyList: ['score', 'uptime'], // 你要获取的、托管在微信后台的key
    success: res => {
      let data = res.data
      drawRankList(data)
    }
  })
}

// 监听接收主域消息
wx.onMessage(data => {
  if (data.command === 'render') {
    // ... 重绘 sharedCanvas
    // context.fillStyle = 'red'
    // context.fillRect(0, 0, 100, 100)
  } else if (data.command === 'getFCloudStorage') { // 获取好友数据排行榜
    getFCloudStorage()
  } else if (data.command === 'getMyCloudStorage') { // 获取我的游戏云数据
    getMyCloudStorage()
  } else if (data.command === 'defaultData') {       // 默认主域向开放域传递数据保存
    map = new Map([...map, ...new Map(data.newdata)]);
  }
})
