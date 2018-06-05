<template>
  <view class="container page">
    <view class="page__hd">
      <view class="page__title">绑定手机</view>
      <view class="page__desc">绑定手机可以帮助在小爱智能音箱上更方便地使用“我的课表”技能</view>
    </view>
    <view class="page__bd content">
      <view class="weui-toptips weui-toptips_warn" v-if="false">错误提示</view>
      <view class="weui-cells__title" v-if="bindPhone.length !== 0">已绑定手机：{{bindPhone}}</view>
      <form report-submit='true' @submit="formSubmit" @reset="formReset">
        <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
              <view class="weui-label">手机号</view>
            </view>
            <view class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入手机号" v-model="inputPhone" type="number"/>
            </view>           
          </view>
          <view class="weui-cell weui-cell_input weui-cell_vcode">
            <view class="weui-cell__hd">
              <view class="weui-label">验证码</view>
            </view>
            <view class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入验证码" v-model="inputCode" type="number"/>
            </view>
            <view class="weui-cell__ft">
              <button class="weui-vcode-btn" type="primary" plain="true" :disabled="vcodeDisable" @click="requestCode">
                {{vcodeOperation}}
              </button>
            </view>
          </view>
          <view class="weui-cell weui-cell_input button-area">
            <view class="weui-flex">
              <view class="weui-flex__item">
                <button class="weui-btn" type="primary" formType="submit" :disabled='sumbitDisable'>绑定</button>
              </view>
              <view class="weui-flex__item">
                <button class="weui-btn" type="warn" formType="reset" :disabled='bindPhone.length === 0'>解绑</button>
              </view>
            </view>
          </view>
        </view>
      </form>

    </view>
  </view>  
</template>

<script>

import {mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      inputPhone: '',
      inputCode: '',
      requestInterval: 0
    }
  },

  computed: {
    ...mapState({
      bindPhone: state => {
        return state.phone.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    }),

    vcodeDisable () {
      return !this.validPhone() || this.requestInterval > 0
    },

    sumbitDisable () {
      return !(this.validPhone() && this.validCode())
    },

    vcodeOperation () {
      if (this.requestInterval > 0) {
        return `等待 (${this.requestInterval}秒)`
      } else {
        return '获取验证码'
      }
    }

  },

  methods: {
    ...mapActions([
      'toRequestCode',
      'toBindPhone',
      'toGetPhone',
      'toUnbindPhone'
    ]),

    validPhone () {
      return /^1(3|4|5|7|8|9)\d{9}$/.test(this.inputPhone)
    },

    validCode () {
      return /^\d{6}$/.test(this.inputCode)
    },

    requestCode () {
      if (!this.vcodeDisable) {
        this.toRequestCode(this.inputPhone)
          .then(() => {
            this.restartRequestInterval()
          }).catch((err) => {
            wx.showToast({
              title: err.message,
              icon: 'none'
            })
          })
      }
    },

    formReset (ev) {
      var formId = ev.mp.detail.formId
      this.toUnbindPhone(formId).then(() => {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          mask: true
        })
      })
    },

    formSubmit (ev) {
      var formId = ev.mp.detail.formId
      if (this.validPhone && this.validCode) {
        this.toBindPhone({phone: this.inputPhone,
          code: this.inputCode,
          formId})
          .then(() => {
            this.inputPhone = ''
            this.inputCode = ''
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              mask: true
            })
          })
          .catch((err) => {
            console.log(err)
            wx.showToast({
              title: '无效的验证码',
              mask: true
            })
          })
      }
    },

    restartRequestInterval: function () {
      this.requestInterval = 60
      clearInterval(this.intervalId)
      this.intervalId = setInterval(() => {
        this.requestInterval--
        if (this.requestInterval === 0) {
          clearInterval(this.intervalId)
        }
      }, 1000)
    }
  },

  created () {
    this.toGetPhone()
  }
}
</script>

<style scoped>
.button-area .weui-flex {
  width: 100%;
  padding: 2px 2px  
}
</style>
