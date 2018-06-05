<template>
  <view class="weui-cell info" >
    <view class="weui-cell__bd input-area">
      <view class="weui-flex">
        <view class="weui-flex__item">
        <input class="weui-input " placeholder="请输入课程" focus="true" :value="course" v-model="inputValue" @confirm="$emit('inputConfirm', inputValue)"/>
        </view>
        <picker v-if="allCourses!==[]" class="" @change="$emit('inputConfirm',allCourses[$event.mp.detail.value])" :value="select" :range="allCourses">
          <view class="all-choice weui-input">
              备选课程
          </view>
        </picker>
      </view>
      <view class="weui-cells select-list">
          <view class="weui-cell" @click="$emit('inputConfirm', course)" v-for="course in selectedCourses" :key="course">
              <view class="weui-cell__bd">{{course}}</view>
          </view>
      </view>
    </view>
    <view class="editMask" @click="$emit('inputCancel')"></view>
  </view> 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      inputValue: this.course,
      select: 0,
      courses: this.$store.getters.allCourses
    }
  },
  props: {
    course: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'allCourses'
    ]),
    selectedCourses () {
      return this.allCourses.filter((course) => this.inputValue !== '' && course.indexOf(this.inputValue) !== -1)
    }
  },

  methods: {
    pickerChange (ev) {
      this.$emit()
      console.log(this.allCourses)
      console.log(ev)
    }
  }
}
</script>

<style scoped>
.input-area {
  position: relative;
  left: 0;
  top: 0;
  height:100%;
  z-index: 3000!important;
  background-color: white;
  margin-bottom: 3px;
  padding: 0 8px;
  border-radius: 20rpx;
}
.input-area input{
  background-color: white;
  max-height: 40rpx !important;
}

.select-list {
  width: 500rpx;
  position: absolute;
  z-index: 3000;
  top: 48px;
  background-color: #f8f8f8;
  z-index: 1000;
  margin-top: 0 !important;
  display: block;
  z-index: 3000;
  font-size: 30rpx;
  color: #111111;
  overflow-y: hidden;
  transition: .5s;
}
.elevation-8 {

  -webkit-box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)!important;
  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)!important
}
.editMask{
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  
}
.input-area picker .weui-input {
  background-color: rgb(207, 204, 204);
  color: rgb(0, 128, 0);
  border-radius: 5px;
}
.select-list .weui-cell:active {
  background-color:  rgb(0, 128, 0, 0.5)
}

</style>