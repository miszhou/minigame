let sharedCanvas = wx.getSharedCanvas()
let context = sharedCanvas.getContext('2d')
context.fillStyle = 'red'
context.fillRect(0, 0, 100, 100)

// 排行榜绘制
function drawRankList(data) {
  data.forEach((item, index) => {
    // ...
  })
}
function getCloudStorage() {
  // 获取排行榜好友数据
  wx.getFriendCloudStorage({
    success: res => {
      let data = res.data
      // console.log(res)
      drawRankList(data)
    }
  })
}

// 监听接收主域消息
wx.onMessage(data => {
  if (data.command === 'render') {
    context.fillStyle = 'red'
    context.fillRect(0, 0, 100, 100)
    // ... 重绘 sharedCanvas
  } else if (data.command === 'getCloudStorage') { // 获取好友数据排行榜
    getCloudStorage()
  }
})

// // 保存用户游戏数据到开放域 
// wx.setUserCloudStorage({
//   KVDataList: [{ key: 'score', value: score }],
//   success: res => {
//     console.log(res);
//     // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
//     let openDataContext = wx.getOpenDataContext();
//     openDataContext.postMessage({
//       type: 'updateMaxScore',
//     });
//   },
//   fail: res => {
//     console.log(res);
//   }
// });

