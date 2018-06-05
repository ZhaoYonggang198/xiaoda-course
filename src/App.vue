<script>
export default {
  created () {
  },
  onShow (option) {
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5rpx 0;
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: hidden;
}

.icon {
  height: 60rpx;
  width: 60rpx;
}

.transited.width.slow {
  -webkit-transition: width 2s; /* For Safari 3.1 to 6.0 */
  transition: width 2s;
}

.transited.width.fast {
  -webkit-transition: width 1s; /* For Safari 3.1 to 6.0 */
  transition: width 1s;
}

.transited.fast {
  -webkit-transition: .3s; /* For Safari 3.1 to 6.0 */
  transition: .3s;
}

.transited.slow {
  -webkit-transition: 3s; /* For Safari 3.1 to 6.0 */
  transition: 3s;
}

page{
    background-color: #F8F8F8;
    font-size: 16px;
    font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
    overflow-x:hidden;
    width: 100%
}
.page__hd {
    padding: 20px 40px;

}
.page__bd {
    padding-bottom: 40px;
}
.page__bd_spacing {
    padding-left: 15px;
    padding-right: 15px;
}

.page__ft{
    padding-bottom: 10px;
    text-align: center;
}

.page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
}

.page__desc {
    margin-top: 5px;
    color: #888888;
    text-align: left;
    font-size: 14px;
}

</style>
