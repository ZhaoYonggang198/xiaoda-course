import wechat from './wechat'
import config from '@/config.js'
const url = config.service.courseUrl

const weekdays = [{
  backend: 'monday',
  frontend: '星期一'
},
{
  backend: 'tuesday',
  frontend: '星期二'
},
{
  backend: 'wednesday',
  frontend: '星期三'
},
{
  backend: 'thursday',
  frontend: '星期四'
},
{
  backend: 'friday',
  frontend: '星期五'
},
{
  backend: 'saturday',
  frontend: '星期六'
},
{
  backend: 'sunday',
  frontend: '星期日'
}
]

const intervals = [{
  backend: 'morning',
  frontend: '上午'
},
{
  backend: 'afternoon',
  frontend: '下午'
},
{
  backend: 'evening',
  frontend: '晚上'
}
]

var getFrontEndCourse = function (backendCourse) {
  let frontend = []
  for (let day of weekdays) {
    let daycourse = {}
    daycourse.name = day.frontend
    daycourse.interval = []
    for (let interval of intervals) {
      let intervalCourse = {}
      intervalCourse.name = interval.frontend
      intervalCourse.course = backendCourse[day.backend]
        ? (backendCourse[day.backend][interval.backend] || [])
        : []
      daycourse.interval.push(intervalCourse)
    }
    frontend.push(daycourse)
  }
  return frontend
}

var getBackEndCourse = function (frontEnd) {
  let backend = {}
  for (let dayIdx in weekdays) {
    backend[weekdays[dayIdx].backend] = {}
    for (let intervalIdx in intervals) {
      backend[weekdays[dayIdx].backend][intervals[intervalIdx].backend] =
        frontEnd[dayIdx].interval[intervalIdx].course
    }
  }
  return backend
}

const state = {
  courseInfo: [],
  openid: ''
}

function __allCourses (state) {
  const courseInfo = state.courseInfo
  var courses = []
  courseInfo.map(day => {
    day.interval.map(interval => {
      interval.course.map(course => {
        if (courses.indexOf(course) === -1) {
          courses.push(course)
        }
      })
    })
  })
  return courses
}

const getters = {
  allCourses: state => {
    return __allCourses(state)
  }
}

const mutations = {
  setCourses (state, courseInfo) {
    state.courseInfo = courseInfo
  },

  deleteCourse (state, {day, interval, course}) {
    state.courseInfo[day].interval[interval].course.splice(course, 1)
  },

  editCourse (state, {day, interval, course, value}) {
    state.courseInfo[day].interval[interval].course.splice(course, 1, value)
  },

  appendCourse (state, {day, interval, value}) {
    console.log('appendCourse')
    console.log(state)
    console.log({day, interval, value})
    state.courseInfo[day].interval[interval].course.push(value)
  },

  appendCourseAfter (state, {day, interval, course, value}) {
    console.log('appendCourseAfter')
    console.log(state)
    console.log({day, interval, course, value})
    state.courseInfo[day].interval[interval].course.splice(course, 0, value)
  },

  mergeCourses (state, courseInfo) {
    var allCourses = __allCourses(state)
    if (allCourses.length === 0) {
      state.courseInfo = courseInfo
    }
    console.log(state)
  },

  setOpenId (state, openid) {
    state.openid = openid
  }
}

function __getCourses (openid) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}?openid=${openid}`,
      success: function (response) {
        if (response.statusCode === 200) {
          var backendCourse = response.data.courseTable
          resolve(getFrontEndCourse(backendCourse))
        } else if (response.statusCode === 404) {
          resolve(getFrontEndCourse({}))
        } else {
          reject(response)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const actions = {
  getCourses ({commit}) {
    return new Promise(function (resolve, reject) {
      wechat.getOpenId().then((openid) => {
        __getCourses(openid).then((courseInfo) => {
          commit('setCourses', courseInfo)
          commit('setOpenId', openid)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  },

  mergeCourses ({commit}, otherOpenId) {
    return new Promise((resolve, reject) => {
      __getCourses(otherOpenId).then((courseInfo) => {
        commit('mergeCourses', courseInfo)
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },

  saveCourses ({commit}, courses) {
    var backendCourses = getBackEndCourse(courses)
    return new Promise((resolve, reject) => {
      wechat.getOpenId()
        .then((openid) => {
          wx.request({
            url: url,
            method: 'POST',
            data: {
              openid: openid,
              courseTable: backendCourses
            },
            success: function (response) {
              commit('setCourses', courses)
              resolve(response)
            },
            fail: function (err) {
              reject(err)
            }
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}