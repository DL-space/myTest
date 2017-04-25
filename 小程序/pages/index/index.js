//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  show: function(){
    this.setData({
      motto: 'DL'
    })
    wx.showModal({
      title: '提示',
      content: '我叫赵坤',
      success: function(res) {
        if (res.confirm) {
            wx.setNavigationBarTitle({
            title: '当前页面'
          })
      
        }
      }
    })
  }
})
