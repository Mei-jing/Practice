Page({
    onTap:function(){
      wx.redirectTo({
        url: '../posts/posts',
      })
      console.log('onTap')
    }
})