<template>
<view>
  <block v-for="(course, k) in courses" :key="k">
    <block v-if="courseShow[k]">
      <course :course="course" 
        @addCourse='toAddCourseAfter(k)'
        @editCourse='toEditCourse(k)'
        @deleteCourse="deleteCourse(k)"></course>
    </block>
    <block v-if="modifyShow[k]">
      <editable-course :course="course" 
        @inputConfirm="editCourse(k, $event)"
        @inputCancel="inputCancel">
      </editable-course>
    </block>
    <block v-if="addShow[k]">
      <editable-course course=""
        @inputConfirm="addCourse(k+1, $event)"
        @inputCancel="inputCancel">
      </editable-course>
    </block>    
  </block>
    <block v-if="onlyEditableCourseShow">
      <editable-course course=""
        @inputConfirm="addFirstCourse($event)"
        @inputCancel="inputCancel">
      </editable-course>
    </block>  
  <view class="weui-cell weui-cell_link" v-if="addMoreShow">
    <view class="weui-cell__bd" @click="toAddCourseAfter(courses.length-1)">添加更多</view>
  </view>
</view>  
</template>

<script>
import course from '@/components/course'
import editableCourse from './editableCourse.vue'
import { mapState } from 'vuex'

export default {
  props: {
    courses: {
      type: Array,
      default: []
    },
    day: {
      type: Number
    },
    interval: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      editStatus: state => state.editStatus
    }),
    courseShow () {
      return this.courses.map((course, index) => {
        return !(this.isEditingCourse(index) && this.editStatus.status === 'modify')
      })
    },
    modifyShow () {
      return this.courses.map((course, index) => {
        return this.isEditingCourse(index) && this.editStatus.status === 'modify'
      })
    },
    addShow () {
      return this.courses.map((course, index) => {
        return this.isEditingCourse(index) && this.editStatus.status === 'add'
      })
    },
    addMoreShow () {
      return this.editStatus.status === '' ||
          this.editStatus.day !== this.day ||
          this.editStatus.interval !== this.interval
    },

    onlyEditableCourseShow () {
      return this.editStatus.day === this.day &&
          this.editStatus.interval === this.interval &&
          this.courses.length === 0 &&
          this.editStatus.status === 'add'
    }

  },
  components: {
    course,
    editableCourse
  },
  methods: {
    toAddCourseAfter (index) {
      this.$store.commit('setEditStatus', {
        day: this.day,
        interval: this.interval,
        course: index,
        status: 'add'})
    },
    toEditCourse (index) {
      this.$store.commit('setEditStatus', {
        day: this.day,
        interval: this.interval,
        course: index,
        status: 'modify'})
    },
    clearEditStatus () {
      this.$store.commit('clearEditStatus')
    },
    deleteCourse (course) {
      this.$store.commit('deleteCourse',
        {day: this.day, interval: this.interval, course: course})
      this.clearEditStatus()
      this.$emit('courseUpdate')
    },
    editCourse (index, value) {
      if (value === '') {
        this.$store.commit('deleteCourse', {day: this.day, interval: this.interval, course: index})
      } else {
        this.$store.commit('editCourse', {day: this.day, interval: this.interval, course: index, value})
      }
      this.clearEditStatus()
      this.$emit('courseUpdate')
    },
    addFirstCourse (value) {
      if (value === '') {
        return
      }
      this.$store.commit('appendCourse', {day: this.day, interval: this.interval, value})
      this.clearEditStatus()
      this.$emit('courseUpdate')
    },
    addCourse (course, value) {
      if (value === '') {
        return
      }
      this.$store.commit('appendCourseAfter', {day: this.day, interval: this.interval, course, value})
      this.clearEditStatus()
      this.$emit('courseUpdate')
    },

    isEditingCourse (index) {
      return this.day === this.editStatus.day &&
            this.interval === this.editStatus.interval &&
            index === this.editStatus.course
    },
    inputCancel () {
      this.clearEditStatus()
    }
  }
}
</script>

<style scoped>
.card {
  padding: 10px;
}
</style>