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
    // http://www.jianshu.com/p/23cf3199f606
    // https://www.jianshu.com/p/f14de0935c38

    var url = options.url
    console.log(url)
    var that = this
    wx.request({
      url: url,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)
        console.log(res.data)
        // that.setData({
        //   detail: res.data,
        //   richText: res.data,
        // })
        var article = res.data;
        let html = `<a href="/pages/logs/logs">文本内容</a><br><p class="test-class-name" style="text-align: center;" style="color: #ccc;">p 直属内容<u><i><strike color="#f00">tes<b color="#000">t</b></strike></i></u></p><p style="text-align: center;" checked width="100"><img src="https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/3.png?t=2017213" alt="image"></p><p style="text-align: center; "><b style="background-color: rgb(146, 208, 80);">&nbsp; &nbsp; 分类 &nbsp; &nbsp;&nbsp;</b></p><p style="text-align: center; "><span style="background-color: rgb(255, 255, 255);">&nbsp; <span style="color:#ff0000"><span style="font-size:10px">介</span><span style="font-size:12px">绍</span><font size="3">信</font><font size="4">息</font><font size="5">哈</font><font size="6">哈</font><font size="7">哈</font></span></span></p>`;

        wxParser.parse({
          bind: 'richText',
          html: res.data,
          target: that,
          enablePreviewImage: false,
          tapLink: (url) => { // 点击超链接时的回调函数
            // url 就是 HTML 富文本中 a 标签的 href 属性值
            // 这里可以自定义点击事件逻辑，比如页面跳转
            wx.navigateTo({
              url
            });
          }
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