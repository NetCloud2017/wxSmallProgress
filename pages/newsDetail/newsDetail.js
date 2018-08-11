// pages/newsDetail/newsDetail.js
const {list_data}=require('../../datas/list-data.js')
let appData =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsDetail:{},
    index:'',
    isCollected:false,
    isPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {index} =options;
    this.setData({newsDetail:list_data[index],index})
    let oldNewsDetail = wx.getStorageSync('isCollected')
    if(!oldNewsDetail){
      //这里解决obj初次点击收藏获取的obj获取不到任何东西的问题
      wx.setStorageSync('isCollected',{})
    }
    if(oldNewsDetail[index]){
      this.setData({isCollected:true})
    }
    //用来监听是否播放音乐 ,当在后台播放器哪里控制时也能，改变状态；
    wx.onBackgroundAudioPlay(()=>{
        this.setData({
          isPlay:true
        })
        //这里是识别某个页面在播放
        appData.data.isAppData=true;
        appData.data.pageIndex= index
    })
  // 当退出当组件在进入时 判断是不是当前组件在播放；
    if(appData.data.isAppPlay && appData.data.pageIndex=== index){
      this.setData({
        isPlay:true
      })
    }
    //音乐关闭监听；
    wx.onBackgroundAudioPause(()=>{
        this.setData({
          isPlay:false
        })
        appData.data.isAppPlay=false
    })
  },

  playMusic(){
    let {isPlay} = this.data
    isPlay = !isPlay;
    this.setData({isPlay})
    if(isPlay){
      let { dataUrl, title } = this.data.newsDetail.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      wx.pauseBackgroundAudio()
    }
  },


  collection (){
   let {isCollected,index} = this.data
    isCollected = !isCollected
    this.setData({
      isCollected
    })
    let title= isCollected? '已收藏':'已取消收藏'
  //收藏后的弹窗；
    wx.showToast({
      title,
      icon:'success'
    })

    // 获取传进去的那个对象，并一个一个加属性，若直接调用setStorage来传进去的话是直接操作整个对象，会将对象的所有内用直接覆盖，所以是拿到对象后再添加属性再，用setStorage保存：
    wx.getStorage({
      key:'isCollected',
      success: (datas)=>{
        //在最初点击收藏的时候不会有任何缓存如何解决获取到obj 是个对象呢?
        let obj =datas.data;
        obj[index]=isCollected;
        //setStorage 放到这里面是假设用户已收藏过但是还要点击收藏按钮，得改变里面的状态；
        wx.setStorage({
          key: 'isCollected',
          data:obj,
          success: () => {
            //收藏成功的回调；
            console.log('setStorage Success')
          }
        })
      }
    })
   
  },
  shareTo (){
    wx.showActionSheet({
      itemList: ['分享到朋友圈','分享给朋友','分享到微博'],
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})