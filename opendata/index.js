let sharedCanvas = wx.getSharedCanvas()
let context = sharedCanvas.getContext('2d')
let datalist = {}
let map = new Map()
let sharemap = new Map()
let background = {
  x: 20,
  y: 60,
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
  // 背景绘制
  context.fillStyle = '#606060'
  background.width = map.get('innerWidth') - 40
  background.height = map.get('innerHeight') - 250
  context.fillRect(background.x * map.get('ratio'), background.y * map.get('ratio'), background.width * map.get('ratio'), background.height * map.get('ratio'))
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
  datalist.sort(compare('KVDataList'))
  let fontsize = 18 * map.get('ratio')
  datalist.forEach((item, index) => {
    item.index = index
    context.font = fontsize + "px Courier New bold";
    //设置字体填充颜色
    context.fillStyle = "white";
    context.fillText(item.index + 1, (background.x + 24) * map.get('ratio'), (background.y + 40 + index * background.lineheight) * map.get('ratio'), 10 * map.get('ratio'))
    context.drawImage(item.faceimg, 0, 0, item.faceimg.width, item.faceimg.height, (background.x + 60) * map.get('ratio'), (background.y + 20 + index * background.lineheight) * map.get('ratio'), 30 * map.get('ratio'), 30 * map.get('ratio'))
    context.fillText(item.nickname, (background.x + 110) * map.get('ratio'), (background.y + 40 + index * background.lineheight) * map.get('ratio'), 150 * map.get('ratio'))
  context.fillText(item.KVDataList[0].value, (background.width - 40) * map.get('ratio'), (background.y + 40 + index * background.lineheight) * map.get('ratio'), 20 * map.get('ratio'))
  })
}
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
function getCloudStorage() {
  // 获取排行榜好友数据
  wx.getFriendCloudStorage({
    keyList: ['score', 'score1'], // 你要获取的、托管在微信后台的key
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
  } else if (data.command === 'getCloudStorage') { // 获取好友数据排行榜
    getCloudStorage()
  } else if (data.command === 'defaultData') {
    map = new Map([...map, ...new Map(data.newdata)]);
  }
})

