// pages/index/index.js
Page({
 

  /**
   * 组件的初始数据
   */
  data: {
    msg:'',
    user:'',
    isShow:true
  },
  goToList (){
    wx.navigateTo({
      url:"/pages/list/list",
    })
  },
  onLoad:function(options){
    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        // 更新data中的userInfo
        this.setData({
          user: data.userInfo
        });
      },
      fail: () => {
        console.log('获取用户数据失败');
      }
    })
  },
  getUserInfo() {
    // 判断用户是否授权了
    wx.getSetting({
      success: (data) => {
        console.log(data);
        if (data.authSetting['scope.userInfo']) {
          // 用户已经授权
          this.setData({
            isShow: false
          });
        } else {
          // 没有授权
          this.setData({
            isShow: true
          });
        }
      }
    })

    // 获取用户登录的信息
    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        // 更新data中的userInfo
        this.setData({
          user: data.userInfo
        });
      },
      fail: () => {
        console.log('获取用户数据失败');
      }
    })
  },
  handleGetUserInfo(data) {
    console.log('用户点击了', data);
    // 判断用户点击的是否是允许
    if (data.detail.rawData) {
      // 用户点击的是允许
      this.getUserInfo();
    }
  },
   
 
})
 