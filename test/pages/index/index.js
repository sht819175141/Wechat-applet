//index.js
//获取应用实例
var common=require('../../common.js')
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    msg:'屏幕信息',
    arr:[
      {'name':'连续贱'},
      {"name":'李盟盟'},
      {'name':'赵超'}
    ]
  },
  onShareAppMessage:function(){
    return{
      title:'小黄人'
    }
  },
  //事件处理函数
  click(){
    this.setData({
      msg:'你好啊'
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  com:function(){
    common.sayHello('杜磊')
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
  }
})
