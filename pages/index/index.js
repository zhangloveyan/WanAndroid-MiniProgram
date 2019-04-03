//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    articleList: [],
    pageNum: 0
  },
  onLoad: function() {
    var that = this
    wx.request({
      url: 'https://www.wanandroid.com/article/list/0/json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          articleList: res.data.data.datas
        })
      }
    })
  },
  articleClick: function(e) {
    var url = e.currentTarget.dataset.data.link
    console.log(url)
    wx.navigateTo({
      url: '../detail/detail?url=' + url,
    })
  }
})