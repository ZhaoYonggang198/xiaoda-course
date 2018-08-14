<template lang="pug">
view(class="page content")
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
      i-button(type="ghost" @iclick="editcourse") 编辑课表
    view(class="weui-flex__item")
      i-button(open-type="share" type="ghost") 分享课表
    view(class="weui-flex__item")
      i-button(type="primary" @iclick="bindphone") 关联小爱
</template>

<script>
import navBar from '@/components/navbar'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      curDay: 0,
      activeDay: 0
    }
  },

  computed: {
    ...mapState({
      courseInfo: state => state.courses.courseInfo
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
      'getCourses'
    ]),
    tabActive (index) {
      this.activeDay = index
    },
    bindphone () {
      wx.navigateTo({
        url: '/pages/phone/main'
      })
    },
    editcourse () {
      wx.navigateTo({
        url: '/pages/editcourse/main'
      })
    }
  },

  created () {

  },

  onLoad () {
    this.getCourses().then(() => {
      var date = new Date()
      var weekday = date.getDay()
      this.curDay = (weekday === 0 ? 6 : (weekday - 1))
    })
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
</style>
