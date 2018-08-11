import Vue from 'vue'
import App from './App'
import store from './store'
import 'weui-wxss/dist/app.wxss'
import 'animate.css/animate.css'
import '@/../static/font/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/course/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '小哒课表',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/course/main',
        text: '我的课表',
        iconPath: 'static/image/ic_event_note.png',
        selectedIconPath: 'static/image/ic_event_note_sel.png'
      }, {
        pagePath: 'pages/phone/main',
        text: '关联小爱',
        iconPath: 'static/image/phone.png',
        selectedIconPath: 'static/image/phone_sel.png'
      }],
      selectedColor: '#0b915d'
    }
  }
}
