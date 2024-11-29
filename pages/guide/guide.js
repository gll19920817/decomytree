Page({
  data: {
    step: 0,
    total: 3,
    treeArr: Array.from(Array(8).keys()),
    topperArr: Array.from(Array(6).keys()),
    selectedTopperIndex: 0,
    username: "",
    selectedTreeIndex: 0,
    forwardDisabled: true,
  },

  async forward() {
    if (this.data.forwardDisabled) {
      return;
    }

    this.setData({
      step: this.data.step + 1,
      forwardDisabled: true,
    });

    if (this.data.step > this.data.total) {
      wx.showLoading({
        title: "您的圣诞树制作中...",
        mask: true,
      });

      const db = wx.cloud.database();
      await db.collection("trees").add({
        data: {
          username: this.data.username,
          tree_index: this.data.selectedTreeIndex,
          topper_index: this.data.selectedTopperIndex,
        },
        success: (res) => {
          wx.showToast({
            title: "成功",
            icon: success,
            duration: 2000,
          });
        },
        complete: () => {
          const app = getApp();
          wx.hideLoading();
          wx.redirectTo({
            url: "/pages/home/home?hashId=" + app.globalData.openid,
          });
        },
      });
    }
  },

  selectTopper(e) {
    this.setData({
      selectedTopperIndex: e.currentTarget.dataset.topperIndex,
    });
  },

  usernameChange(e) {
    this.setData({
      username: e.detail.value,
      forwardDisabled: e.detail.value ? false : true,
    });
  },

  selectPrevTree() {
    if (this.data.selectedTreeIndex == 0) {
      return;
    }

    this.setData({
      selectedTreeIndex: this.data.selectedTreeIndex - 1,
    });
  },

  selectNextTree() {
    if ((this.data.selectedTreeIndex = this.data.treeArr.length - 1)) {
      return;
    }

    this.setData({
      selectedTreeIndex: this.data.selectedTreeIndex + 1,
    });
  },
});
