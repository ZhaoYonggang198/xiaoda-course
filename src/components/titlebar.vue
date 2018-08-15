<template lang="pug">
  view(class="title-bar-wrapper" :style="'padding-top:'+topPadding+'rpx'")
    view(class="title-bar weui-flex")
      view(class="placeholder")
        view(v-if="canReturn" @click="navigateBack" class="return-button")
          i-icon(type="return")
          view 返回
        image(class="logo" src="/static/image/logo-title.png" v-else)
      view(class="title-wrapper weui-flex__item") 
        view(class="title") {{title}} 
      view(class="placeholder")
</template>

<script>
export default {
  data () {
    return {
      topPadding: 0,
      canReturn: false
    }
  },
  props: {
    title: {
      type: String,
      default: '我的课表'
    }
  },
  methods: {
    navigateBack () {
      wx.navigateBack()
    }
  },
  onLoad () {
    this.canReturn = getCurrentPages().length > 1
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.topPadding = res.statusBarHeight * 2
        if (!this.canReturn) {
          this.topPadding += 40
        }
      }
    })
  }
}
</script>

<style scoped>
.title-bar-wrapper {
  background: #1c2438;
  color: white;
}

.title-bar {
  width: 100%;
  height: 100rpx;
}

.placeholder {
  width: 215rpx;
  padding-left: 20rpx;
  padding-bottom: 20rpx;
}

.logo {
  width:195rpx;
  height:84rpx;
}

.title-wrapper {
  display: flex;
  justify-content: center;
  align-content:  center;
  flex-direction: column;
}

.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 40rpx;
  line-height: 40rpx;
  height: 40rpx;
}

.return-button {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  padding-top: 20rpx;
}

.placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
