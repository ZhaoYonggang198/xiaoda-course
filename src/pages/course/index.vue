<template>
  <block>
  <view v-if="loading" class="container page" >
      <view class="placeholder" style="height: 100%">
        <image style="height:200px; width: 200px" mode="aspectFit" src="../../static/image/logo.png" /> 
      </view>
  </view>
  <view class="container page animated fadeIn" v-else>
    <view class="page__hd" style="width:100%">
      <view class="page__title">
        <view class="weui-flex" >
          <view class="weui-flex__item" >
            我的课表
          </view>
        </view>
      </view>
    </view>
    <view class="page__bd content">
      <view class="day-wrapper" :class="{currentDay: currentWeekday===i}" v-for="(day, i) in courseInfo" :key="i">
        <view class="weui-flex primary_title" @click="switchCollapse(i)">
          <view><view class="placeholder">{{day.name}}{{currentWeekday === i ? '(今天)':''}}</view></view>
          <view class="weui-flex__item"></view>
          <view>
            <collapse :status="collapseStatus[i]" ></collapse>
          </view>
        </view>
        <view  class="weui-cells weui-cells_after-title"  v-if="collapseStatus[i]">
          <view class="interval">
            <day-item :day="i" :intervals="day.interval" 
              @courseUpdate="courseUpdate"
              ></day-item>
          </view>
        </view>
      </view>
    </view>
  </view>
  </block>


</template>

<script>
import dayItem from '@/components/dayItem'
import collapse from '@/components/collapse'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      collapseStatus: [false, false, false, false, false, false, false],
      motto: 'Hello World',
      animation: {},
      currentWeekday: 0,
      loading: true
    }
  },

  computed: {
    ...mapState({
      courseInfo: state => state.courses.courseInfo,
      openid: state => state.courses.openid,
      editStatus: state => state.editStatus.status
    })
  },

  components: {
    'day-item': dayItem,
    collapse
  },

  watch: {
    courseInfo (curval, oldval) {
      if (oldval.length === 0) {
        this.loading = false
        setTimeout(() => {
          this.toCurrentDay()
        }, 200)
      }
    }
  },

  methods: {
    ...mapMutations([
      // 'deleteCourse'
    ]),
    ...mapActions([
      'getCourses',
      'saveCourses',
      'mergeCourses'
    ]),

    switchCollapse (day) {
      var collapse = !this.collapseStatus[day]
      this.collapseStatus[day] = collapse
      this.collapseStatus = this.collapseStatus.concat([])
    },

    courseUpdate () {
      this.saveCourses(this.courseInfo)
    },

    weekday () {
      var date = new Date()
      var weekday = date.getDay()
      return weekday === 0 ? 6 : (weekday - 1)
    },

    toCurrentDay () {
      wx.pageScrollTo({
        scrollTop: 110 + 37 * this.currentWeekday,
        duration: 500
      })
    }
  },

  created () {
    this.getCourses()
      .then(() => {
        if (this.otherUser !== undefined) {
          this.mergeCourses(this.otherUser)
            .then(() => {
              this.courseUpdate()
            })
        } else {
          console.log('other user is empty')
        }
      })
  },

  onShow () {
    this.currentWeekday = this.weekday()
    this.collapseStatus = this.collapseStatus.map((status, index) => {
      return index === this.currentWeekday
    })

    this.toCurrentDay()
  },

  onReady () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onLoad (option) {
    console.log(option)
    if (option.user !== undefined) {
      this.otherUser = option.user
    }
  },

  onShareAppMessage: function () {
    return {
      path: `/pages/course/main?user=${this.openid}`
    }
  },

  onPageScroll: function (ev) {
    console.log(ev)
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  padding: 0 5rpx;
}

.day {
  overflow: hidden;
}

.primary_title {
  background-color: #e8ebeb;
  color: black;
  border-radius: 5px;
  padding: 5px;
}

.day-wrapper {
  margin-bottom: 5px;
}

.day-wrapper.currentDay .primary_title .placeholder {
  color: #1cb2b9;
}

.day-wrapper.currentDay .primary_title {
  background-color: #dfdfdf;
}

.page__title .weui-flex__item {
  text-align: center;
  font-size: 2em;
}
</style>
