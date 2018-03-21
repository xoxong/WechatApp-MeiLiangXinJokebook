//index.js
//获取应用实例
const app = getApp()
var dataZ2 = [];
var yeshu=1;
var page =1;
//菜单按钮是否点击
var xb_menuBthFunNum = 0;
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: 'https://route.showapi.com/255-1', //仅为示例，并非真实的接口地址
    data: {
      showapi_appid: '59144',
      showapi_sign: 'fc562ca016154dfcb214f8a48b29f362',
      page: page,
      type:29

    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data.showapi_res_body.pagebean.contentlist)
      var data1 = res.data.showapi_res_body.pagebean.contentlist;
      for (var i = 0; i < data1.length; i++) {
        var dataZ1 = [];
        // 内容
        dataZ1[0] = data1[i].text.replace(/(<br\s?\/?>)+/gi, "\t");
        // 时间
        dataZ1[2] = data1[i].ct;
        dataZ2[i] = dataZ1;
      }
      that.setData({
        xb_title: dataZ2,
      });
      console.log(dataZ2)
      that.setData({
        hidden: true
      });
    }
  })
}
Page({
  data: {
    hidden: true,
    scrollTop: 0,
    scrollHeight:1400,
    style_botton:-320
  },
  onLoad: function () {
    var that=this;
    wx.request({
      url: 'https://route.showapi.com/255-1', //仅为示例，并非真实的接口地址
      data: {
        showapi_appid:'59144',
        showapi_sign:'fc562ca016154dfcb214f8a48b29f362',
        page: page,
        type:29

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.showapi_res_body.pagebean.contentlist)
        yeshu = res.data.showapi_res_body.pagebean.allPages;
        var data1 = res.data.showapi_res_body.pagebean.contentlist;
        for (var i = 0; i < data1.length;i++){
          var dataZ1 = [];
          // 内容
          dataZ1[0] = data1[i].text.replace(/(<br\s?\/?>)+/gi, "\t");
          // 时间
          dataZ1[2] = data1[i].ct;
          dataZ2[i] = dataZ1;
        }
        that.setData({
          xb_title: dataZ2,
        });
        console.log(dataZ2)
        that.setData({
          hidden: true
        });
      }
      
    })
  },
  //到达底部
  bindDownLoad: function () {
    wx.showToast({
      title: '上拉刷新',
      icon: 'success',
      duration: 2000
    })
  },
  //bindscroll 页面滑动时
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  // 滑倒页面顶部加载
  refresh: function (event) {
    if (page < yeshu){
      page += 1;
    }
    else{
      page=1;
    }
   
    console.log("当前加载数量")
    console.log(page)
    this.setData({
      scrollTop: 0
    });
    GetList(this)
  },
  //菜单点击按钮

  xb_menuBthFun: function(){
    if (xb_menuBthFunNum==0){
      this.setData({
        style_botton: 300
      })
      xb_menuBthFunNum=1;
    }
    else{
      this.setData({
        style_botton: -320
      })
      xb_menuBthFunNum = 0;
    }
   
  },
  //剪贴板
  xb_Clipboard:function(even){
    wx.setClipboardData({
      data: even.currentTarget.dataset.texts,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  // 菜单跳转页面
  xb_menu2Btn1Fun:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  xb_menu2Btn2Fun: function () {
    wx.navigateTo({
      url: '/pages/duanzi/duanzi',
    })
  },
  xb_menu2Btn3Fun: function () {
    wx.navigateTo({
      url: '/pages/imgText/imgText',
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '梅良心笑话大全-每小时更新',
      path: '/pages/duanzi/duanzi',
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
