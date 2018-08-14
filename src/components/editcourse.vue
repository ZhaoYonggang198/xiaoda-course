<template lang="pug">
view
  i-popup(visible="true" @ok="confirm" @cancel="cancel" :title="title")
    view(style="text-align: left")
        view(class="input-wrapper")
          i-input(:value="coursename" placeholder="请输入课程名" autofocus :error="error"
            @change="change")
          i-cell-group(class="select-course" v-if="showSelectCourse")
            block(v-for="(item, index) in selectCourses" :key="item")
              i-cell(:title="item" @iclick="select(item)") 
                view(class="choose-item" slot="icon")
          
  i-message#message
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      coursename: '',
      showSelectCourse: true
    }
  },
  props: {
    scene: {
      type: String,
      default: 'config'
    },
    day: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: 0
    },
    course: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      courseInfo: state => state.courses.courseInfo
    }),
    title () {
      if (!this.scene) {
        return ''
      }
      let day = this.courseInfo[this.day]
      let intervalDesc = day.name + day.interval[this.interval].name

      if (this.scene === 'add') {
        return `添加${intervalDesc}课程`
      } else {
        return `编辑${intervalDesc}课程`
      }
    },
    selectCourses () {
      if (this.coursename === 0) {
        return []
      }
      return this.$store.getters.allCourses.filter((course) => {
        return this.coursename !== course &&
          course.indexOf(this.coursename) !== -1
      }).splice(0, 5)
    }
  },
  methods: {
    confirm () {
      if (this.scene === 'config') {
        if (this.coursename === '') {
          this.$store.commit('deleteCourse', {
            day: this.day,
            interval: this.interval,
            course: this.course
          })
        } else {
          this.$store.commit('editCourse', {
            day: this.day,
            interval: this.interval,
            course: this.course,
            value: this.coursename})
        }
      } else {
        if (this.coursename !== '') {
          this.$store.commit('appendCourse', {
            day: this.day,
            interval: this.interval,
            value: this.coursename
          })
        }
      }
      this.$store.dispatch('saveCourses', this.courseInfo)
      this.$emit('editdone')
    },
    cancel () {
      this.$emit('editdone')
    },
    change (event) {
      console.log(event)
      this.coursename = event.mp.detail.detail.value
    },
    select (item) {
      this.coursename = item
    }
  },
  onLoad () {
    if (this.scene === 'add') {
      this.coursename = ''
    } else {
      this.coursename = this.courseInfo[this.day].interval[this.interval].course[this.course]
    }
  }
}
</script>

<style>
.choose-item {
  width: 15rpx;
  height: 15rpx;
  border-radius: 50%;
  background: #999
}
.input-wrapper {
  position: relative
}
.select-course {
  max-height: 100px;
}
</style>
