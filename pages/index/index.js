Page({
  onLoad() {
    const app = getApp();
    const db = wx.cloud.database();
    const count = db
      .collection("trees")
      .where({
        _openid: app.globalData.openid,
      })
      .count();

    if (count) {
      wx.redirectTo({
        url: "/pages/home/home?hashId=" + app.globalData.openid,
      });
    }
  },
});
