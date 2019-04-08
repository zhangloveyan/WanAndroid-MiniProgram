//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    articleList: [],
    pageNum: 0
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
        if (that.data.pageNum == 0) {
          localList = res.data.data.datas;
        } else {
          localList = that.data.articleList.concat(res.data.data.datas);
        }
        that.setData({
          articleList: localList
        })
        wx.hideLoading()
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