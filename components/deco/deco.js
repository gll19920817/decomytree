Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    hashId: String,
    username: String,
  },
  data: {
    step: 1,
    total: 2,
    decoArr: Array.from(Array(27).keys()),
    selectedDecoIndex: null,
    isPublic: true,
    forwardDisabled: true,
    from: "",
    message: "",
  },
  methods: {
    selectDeco(e) {
      this.setData({
        selectedDecoIndex: e.currentTarget.dataset.decoIndex,
        forwardDisabled: false,
      });
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
          title: "您的贺卡发送中...",
          mask: true,
        });

        const app = getApp();

        const message = {
          username: this.data.from,
          _openid: app.globalData.openid,
          message: this.data.message,
          deco_index: this.data.selectedDecoIndex,
          publish: this.data.isPublic,
        };

        const db = wx.cloud.database();
        const _ = db.command;

        await db
          .collection("trees")
          .where({
            _openid: this.data.hashId,
          })
          .update({
            data: {
              messages: _.push(message),
            },
            success: (res) => {
              wx.showToast({
                title: "成功",
                icon: success,
                duration: 2000,
              });
            },
            complete: () => {
              wx.hideLoading();
              wx.redirectTo({
                url: "/pages/home/home?hashId=" + this.data.hashId,
              });
            },
          });
      }
    },
    backward() {
      if (this.data.step > 1) {
        this.setData({
          step: this.data.step - 1,
        });
      } else {
        wx.redirectTo({
          url: "/pages/home/home?hashId=" + this.data.hashId,
        });
      }
    },
    toggleIsPublic() {
      this.setData({
        isPublic: !this.data.isPublic,
      });
    },
    canMoveForward() {
      if (this.data.from && this.data.message) {
        this.setData({
          forwardDisabled: false,
        });
      }
    },
  },
});
