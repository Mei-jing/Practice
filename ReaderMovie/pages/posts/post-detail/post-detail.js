var postsData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    console.log(postId);
    this.setData({
      postData: postsData.postList[postId] // 此处 postsData 是对象，postsData 下面的 postlist 才是数组，详见 posts-data.js 文件；
    });

    //初始化
    var postsCollected = wx.getStorageSync('posts_collected') // 变量名一定要注意
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected // 收藏状态绑定
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }


  },

  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected; // 取反，收藏变成未收藏，未收藏变成收藏
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected)
    // 更新缓存
    wx.setStorageSync("posts_collected", postsCollected)
    // 更新数据绑定,从而实现图片切换
    this.setData({
      collected: postCollected
    })

    // wx.showToast({
    //   title: postCollected ? "收藏成功" : "取消成功",
    //   icon: "loading"
    // })
    // wx.showModal({
    //   title: "收藏",
    //   content: "是否收藏改文章",
    //   showcancel: "true",
    //   cancleText: "不收藏",
    //   cancelColor: "#333",
    //   confimText: "收藏",
    //   confirmColor: "#405f80",
    // })
  },

  showModal: function(postsCollected, postCollected) { //自定义函数  //传参否则未定义
    var that = this; // this 的意义取决于上下文环境
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏改文章" : "取消收藏该文章",
      showcancel: "true",
      cancleText: "取消",
      cancelColor: "#445f81",
      confimText: "确认",
      confirmColor: "#445f81",
      success: function(res) {
        if (res.confirm) {
          // 更新缓存
          wx.setStorageSync("posts_collected", postsCollected)
          // 更新数据绑定,从而实现图片切换
          that.setData({
            collected: postCollected
          })
        }

      }
    })
  },

  showToast: function(postsCollected, postCollected) {
    // 更新缓存
    wx.setStorageSync("posts_collected", postsCollected)
    // 更新数据绑定,从而实现图片切换
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      icon: "loading"
    })
  },

  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到 QQ",
      "分享到微博",
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancle 用户是不是点击了取消按钮；
        // res.tapIndex 数组元素的序号，从 0 开始；
        wx.showModal({
          title: itemList[res.tapIndex],
          content: "点击确定分享",
        })
      }
    })
  },

  onMusicTap: function(enent) {
    var currentPostId = this.data.currentPostId;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[currentPostId].music.url,
        title: postsData.postList[currentPostId].music.title,
        coverImgUrl: postsData.postList[currentPostId].music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
    }
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