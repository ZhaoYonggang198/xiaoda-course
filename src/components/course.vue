<template>
  <view class="weui-cell course"  
        @touchstart="touchstart" 
        @touchmove="touchmove" 
        @touchcancel="touchcancel"
        @touchend="touchend">
    <view class="weui-cell__bd" @longpress="$emit('editCourse')" @click="toHideMoreAction">{{course}}</view>
    <view class="weui-cell__ft">
      <view class="action-area weui-flex transited fast" :class="moreActionShow?'show-more':'hide-more'" :style="inTouchStyle">
        <i class="weui-flex__item icon iconfont transited fast" :class="moreActionShow?'icon-ic_chevron_right':'icon-ic_more_horiz'" @click="show(!moreActionShow)"></i>
        <view class="more-action weui-flex">
          <view class="weui-flex__item icon iconfont icon-ic_create" style="" @click="$emit('editCourse')"></view> 
          <view class="weui-flex__item icon iconfont icon-ic_add" style="color: green" @click="$emit('addCourse')"></view>
          <view class="weui-flex__item icon iconfont icon-ic_clear" @click="$emit('deleteCourse')"></view>           
        </view>        
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

const maxDelta = 80
export default {
  data () {
    return {
      moreActionShow: false,
      inTouchStyle: ''
    }
  },
  props: {
    course: {
      type: String,
      default: 'No Name'
    }
  },
  watch: {
    editStatus: {
      handler (curVal, oldVal) {
        this.moreActionShow = false
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      editStatus: state => state.editStatus.status
    })
  },

  methods: {
    show (showMoreAction) {
      this.moreActionShow = showMoreAction
    },
    toHideMoreAction () {
      this.moreActionShow = false
    },
    touchstart (ev) {
      this.startX = ev.pageX
    },
    touchmove (ev) {
      var deltaX = ev.pageX - this.startX
      if (this.isInRange(deltaX)) {
        this.refreshActionStatus(deltaX)
      }
    },
    touchend (ev) {
      if (this.deltaX > 10 || this.deltaX < -10) {
        console.log(this.deltaX)
        this.moreActionShow = !this.moreActionShow
        this.deltaX = 0
      }
      this.inTouchStyle = ''
    },

    touchcancel (ev) {
      this.inTouchStyle = ''
    },

    isInRange (deltaX) {
      return (this.moreActionShow && (deltaX > 0 && deltaX < 80)) ||
        (!this.moreActionShow && (deltaX < 0 && deltaX > -80))
    },

    refreshActionStatus (deltaX) {
      var translateX = deltaX > 0 ? deltaX : maxDelta + deltaX
      this.inTouchStyle = `-webkit-transition: 0.1s; transition: 0.1s;-webkit-transform: translateX(${translateX}%); transform: translateX(${translateX}%);`
      this.deltaX = deltaX
    }
  }
}
</script>

<style scoped>
.card {
  padding: 10px;
}

.course {
  padding: 0;
}

.course .weui-cell__bd {
  padding: 6px 15px;
  overflow: hidden;
}

.show-more {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.action-area {
  overflow: hidden;
}

.hide-more {
  -webkit-transform: translateX(80%);
  transform: translateX(80%);
}

.icon {
  font-size: 50rpx;
  line-height: 70rpx;
  height: 80rpx;
  width: 80rpx;
  text-align: center;
  vertical-align: middle;
  border-right: solid white 1px;
}

.more-action .icon {
  color: white;
  background-color: rgb(187, 182, 182);
}

.more-action .icon.icon-ic_clear {
  color: rgb(207, 75, 19);
}

.action-area {
  height: 100% !important;
}

.icon:active {
  font-size: 65rpx;
}
</style>