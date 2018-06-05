<template>
<block>
  <i class="weui-flex__item icon iconfont icon-ic_arrow_drop_up" :class="status?'show':'hidden'"></i>
</block>

</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
  .icon {
  -webkit-transition: 1s; /* For Safari 3.1 to 6.0 */
  transition: 1s;
  font-size: 40rpx;
  width: 50rpx!important;
  height: 50rpx!important;
  text-align: center;
  vertical-align: middle;
  color: green;
  border-radius: 50%

  }

  .icon.show {
    -webkit-transform: rotate(0);
    transform: rotate(0);    
  }

  .icon.hidden {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);    
  }
</style>