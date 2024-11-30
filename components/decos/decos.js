Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    messages: Array,
  },
  data: {
    rows: [],
    maxRowCount: 4,
  },
  methods: {
    viewMessage(e) {
      this.triggerEvent("viewMessage", e.currentTarget.dataset.messageId);
    },
  },
  lifetimes: {
    attached: function () {
      let messagesCopy = this.data.messages;
      let tmpArr = [];

      for (let i = this.data.maxRowCount; i > 0; i--) {
        tmpArr.push(messagesCopy.splice(0, i));
      }

      this.setData({
        rows: tmpArr,
      });
    },
  },
});
