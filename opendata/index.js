let sharedCanvas = wx.getSharedCanvas()
let context = sharedCanvas.getContext('2d')

// 排行榜绘制
function drawRankList(data) {
  data.forEach((item, index) => {
    // 分条绘制
    console.log('123')
    context.fillStyle = '#808080'
    console.log(window.innerWidth)
    console.log(window.innerHeight)
    context.fillRect(20, 60, window.innerWidth - 40, window.innerHeight - 250)
  })
}
function getCloudStorage() {
  // 获取排行榜好友数据
  wx.getFriendCloudStorage({
    keyList: ['score', 'score1'], // 你要获取的、托管在微信后台的key
    success: res => {
      let data = res.data
      console.log(res)
      // context.fillStyle = 'red'
      // context.fillRect(0, 0, 100, 100)
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
  }
})

