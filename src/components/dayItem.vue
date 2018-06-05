<template>
<view>
  <block v-for="(interval, j) in intervals" :key="j">
    <view class="weui-cells__title interval">{{interval.name}}</view>
    <view class="weui-cells weui-cells_after-title">
      <interval :day="day" :interval="j" :courses="interval.course"
        @courseUpdate="$emit('courseUpdate')"
        ></interval>
    </view>
  </block>
</view>  
</template>

<script>
import interval from '@/components/interval'
export default {
  props: {
    intervals: {
      type: Array,
      default: []
    },
    day: {
      type: Number
    }
  },
  components: {
    interval
  }
}
</script>

<style scoped>
.card {
  padding: 10px;
}
</style>