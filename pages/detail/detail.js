// pages/detail.js
const wxParser = require('../../wxParser/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    richText: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // https://www.jianshu.com/p/f14de0935c38

    var url = options.url
    // var url = 'https://blog.csdn.net/qq_21556263/article/details/82768420'
    // var url = 'https://www.cnblogs.com/jycboy/p/6066654.html'
    console.log(url)
    var that = this
    wx.showLoading({
      title: '正在加载数据'
    })
    wx.request({
      url: url,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var article = res.data;
        // 切割 按照 head，取剩下的 body 部分
        article = article.split("</head>")[1];
        // 公众号的适配处理
        if (url.search('weixin') != -1) {
          console.log('公众号')
          article = article.split('<div class="rich_media_content " id="js_content">')[1]
          article = article.split('</div>')[0]
        }
        // 简书的适配处理
        if (url.search('jianshu') != -1) {
          console.log('简书')
          article = article.split('<section id="layout-default">')[1]
          article = article.split('</section>')[0]
          article = article.split('</header>')[1]
          while (article.search('data-original-src') != -1) {
            article = article.replace('data-original-src="', 'data-src="https:')
          }
        }
        // 掘金的适配处理
        // if (url.search('juejin') != -1) {
        //   console.log('掘金')
        // }
        // CSDN 适配处理
        if (url.search('csdn') != -1) {
          console.log('csdn')
          article = article.split('<div id="main">')[1]
          // while (article.search('src=\'https://csdnimg.cn/release/phoenix/write/assets/img_default.png\'') != -1) {
          //   article = article.replace('src=\'https://csdnimg.cn/release/phoenix/write/assets/img_default.png\'', '')
          // }
        }
        // 博客园的适配处理
        if (url.search('cnblogs') != -1) {
          console.log('cnblogs')
          article = article.split('<div id="topics">')[1]
          article = article.split('</div><a name="!comments">')[0]
          // while (article.search('src') != -1) {
          //   article = article.replace('src', 'data-src')
          // }
        }
        wxParser.parse({
          bind: 'richText',
          html: article,
          target: that,
          enablePreviewImage: true,
          tapLink: (url) => { // 点击超链接时的回调函数
            // url 就是 HTML 富文本中 a 标签的 href 属性值
            // 这里可以自定义点击事件逻辑，比如页面跳转
            wx.navigateTo({
              url
            });
          }
        })
        wx.hideLoading()
      },
      fail: function() {
        wx.hideLoading()
        wx.showToast({
          title: '网络请求异常',
        })
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})