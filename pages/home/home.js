const app = getApp();

Page({
  data: {
    deco: false,
    mytree: true,
    hastree: app.globalData.hastree,
    hashId: "",
    tree: null,
    treeArr: [],
    treeNum: 0,
    displayTreeIndex: 0,
    slicedMessagesArr: [],
    viewMessages: true,
    selectedViewMessageId: "",
  },

  startDeco() {
    this.setData({
      deco: true,
    });
  },

  displayPrevTree() {
    if (this.data.displayTreeIndex == 0) {
      return;
    }
    this.setData({
      displayTreeIndex: this.data.displayTreeIndex - 1,
    });
  },
  displayNextTree() {
    if (this.data.displayTreeIndex == this.data.treeNum - 1) {
      return;
    }
    this.setData({
      displayTreeIndex: this.data.displayTreeIndex + 1,
    });
  },

  onViewMessage(e) {
    const messageId = e.detail;
    const index = this.data.tree.messages.findIndex(
      (message) => message._openid == e.detail
    );

    this.setData({
      viewMessages: true,
      selectedViewMessageId: index,
    });
  },

  closeMessages() {
    this.setData({
      viewMessages: false,
      selectedViewMessageId: "",
    });
  },

  async onLoad(option) {
    const myid = app.globalData.openid;

    const mytree = option.hashId == myid ? true : false;

    this.setData({
      mytree,
      hashId: option.hashId ? option.hashId : myid,
    });

    if (mytree) {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"],
      });
    }

    const db = wx.cloud.database();
    const that = this;

    await db
      .collection("trees")
      .where({
        _openid: option.hashId ? option.hashId : myid,
      })
      .get({
        success: ({ data }) => {
          let messageCountPerTree = 10;
          let tmpMessagesArr = [];

          const treeNum =
            Math.ceil(data[0].messages.length / messageCountPerTree) || 1;

          for (let i = 0; i < treeNum; i++) {
            tmpMessagesArr.push(
              data[0].messages.slice(
                i * messageCountPerTree,
                (i + 1) * messageCountPerTree
              )
            );
          }

          that.setData({
            tree: data[0],
            treeNum,
            treeArr: Array.from(Array(treeNum).keys()),
            slicedMessagesArr: tmpMessagesArr.reverse(),
          });
        },
      });
  },
  onShareAppMessage() {},
});
