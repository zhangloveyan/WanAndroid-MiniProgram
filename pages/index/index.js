//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    articleList: [],
    pageNum: 0,
    condition: []
  },
  onLoad: function() {
    this.loadArticleList()
  },
  loadArticleList() {
    wx.showLoading({
      title: '正在加载数据'
    })
    var that = this
    wx.request({
      url: 'https://www.wanandroid.com/article/list/' + this.data.pageNum + '/json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        var localList = [];
        var list = [];
        if (that.data.pageNum == 0) {
          localList = res.data.data.datas;
        } else {
          localList = that.data.articleList.concat(res.data.data.datas);
        }
        list[0] = true;
        for (let i = 1; i < localList.length; i++) {
          if (localList[i].niceDate != localList[i - 1].niceDate) {
            list[i] = true;
          } else {
            list[i] = false;
          }
        }
        that.setData({
          articleList: localList,
          condition: list
        })
        wx.hideLoading()
      },
      fail: function() {
        wx.showToast({
          title: '网络请求异常',
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      pageNum: 0
    })
    that.loadArticleList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    that.setData({
      pageNum: that.data.pageNum + 1
    })
    that.loadArticleList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})