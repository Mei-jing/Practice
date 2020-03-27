var postsData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    var postCollected = wx.getStorageSync('posts_collected')
    if(postsCollected){
      var postCollected = postsCollected[postId]
      this.setData({
        collected:postCollected  // 收藏状态绑定
      })
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }

   
  },

  onCollectionTap:function(event){
    var postsCollected= wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected; // 取反，收藏变成未收藏，未收藏变成收藏
    postsCollected[this.data.currentPostId] = postCollected;
    // 更新缓存
    wx.setStorageSync("posts_collected", postsCollected)
    // 更新数据绑定,从而实现图片切换
    this.setData({
      collected:postCollected
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