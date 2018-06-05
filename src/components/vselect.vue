<template>
  <view class="dropdown v-select" :class="dropdownClasses">
    <view class="dropdown-toggle clearfix">
      <view class="weui-flex">
        <view class="weui-flex__item">
          <input :class="inputClass" :placeholder="placeholder" />
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>