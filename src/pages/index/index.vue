<template>
  <nav-bar :navItems="weekdays" :defaultIndex="curDay" @tabActive="tabActive"></nav-bar>
</template>

<script>
import navBar from '@/components/navbar'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      curDay: 0
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
    ])
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
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
