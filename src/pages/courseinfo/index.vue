<template lang="pug">
view(class="page content")
  titlebar(title="")
  <view class="title">你朋友的课表</view>
  view(class="course-table")
    view(class="weui-tab")
      view(class="tab-title")
        nav-bar(:navItems="weekdays" :defaultIndex="curDay" @tabActive="tabActive")/
      view(class="weui-tab__panel")
        view(class="weui-tab__content" v-for="(day, index) in courseInfo"
            :key="index" v-if="activeDay == index")
          scroll-view(scroll-y='true' style="height: auto")
            block(v-for="(interval, j) in day.interval" :key="j")
              i-panel(:title="interval.name" class="interval")
                i-cell-group
                  block(v-if="interval.course.length>0")
                    block(v-for="(course, k) in interval.course" :key="k")
                      i-cell(:title="course")
                  block(v-else)
                    i-cell(title="休息")
  view(class="weui-flex")
    view(class="weui-flex__item")
      i-button(size="small" @iclick="gotocourse") 回到主页    
    view(class="weui-flex__item")
      i-button(size="small" type="primary" @iclick="mergecourse") 复制课程
    //- view(class="weui-flex__item")
    //-   i-button(type="ghost" size="small" @iclick="mergecourse") 合并课程
</template>

<script>
import navBar from '@/components/navbar'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      curDay: 0,
      activeDay: 0,
      courseInfo: []
    }
  },

  computed: {
    ...mapState({
      owncourseInfo: state => state.courses.courseInfo
    }),
    weekdays () {
      if (this.courseInfo.length === 0) {
        return []
      }
      return this.courseInfo.map((day) => {
        return day.name
      })
    }
  },

  components: {
    navBar
  },

  methods: {
    ...mapActions([
      'getCourses',
      'getOtherCourses',
      'mergeCourses',
      'saveCourses'
    ]),
    tabActive (index) {
      this.activeDay = index
    },
    gotocourse () {
      wx.reLaunch({
        url: '/pages/index/main'
      })
    },
    mergecourse () {
      this.$store.commit('mergeCourses', this.courseInfo)
      this.saveCourses(this.owncourseInfo)
        .then(() => {
          wx.reLaunch({
            url: '/pages/index/main'
          })
        })
    }
  },

  created () {

  },

  onLoad (option) {
    if (option.user) {
      this.getOtherCourses(option.user)
        .then((courses) => {
          this.courseInfo = courses
        })
    }
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.tab-title {
  background: #999;
  z-index: 2;
}
.course-table {
  flex: 1;
  flex-direction:column;
  display: flex;
}
.title {
  padding: 30rpx;
  text-align: center;
  vertical-align: center;
}
</style>
