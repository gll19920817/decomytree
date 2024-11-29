// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: "decomytree-9gjm3glo8e753189",
      traceUser: true,
    });

    try {
      const openid = wx.getStorageSync("openid");
      if (openid) {
        this.globalData.openid = openid;
      } else {
        wx.cloud.callFunction({
          name: "getOpenid",
          complete: ({ result }) => {
            this.globalData.openid = result.openId;
            wx.setStorageSync("openid", result.openId);
          },
        });
      }

      const db = wx.cloud.database();
      const count = db
        .collection("trees")
        .where({
          _openid: this.globalData.openid,
        })
        .count();
      if (count) {
        this.globalData.hastree = true;
      }
    } catch (e) {}
  },
  globalData: {
    openid: null,
    hastree: false,
  },
});
