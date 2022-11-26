<!-- Login登录页面 -->
<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">梓晴外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信验证码登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{ countDown ? `已发送(${countDown}s)` : "获取验证码" }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="6"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：
              未注册梓晴外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》 </a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-if="!showPwd"
                  v-model="pwd"
                />
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-else
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="showPwd ? 'on' : 'off'"
                  @click="showPwd = !showPwd"
                >
                  <div
                    class="switch_circle"
                    :class="showPwd ? 'right' : ''"
                  ></div>
                  <span class="switch_text">{{ showPwd ? "on" : "" }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click="changeCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-fanhuijiantou"></i>
      </span>
    </div>
    <AlertTip
      v-if="showAlert"
      :alertText="alertText"
      @closeTip="closeTip"
    ></AlertTip>
  </div>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import { reqSmsLogin, reqSendCode, reqPwdLogin } from "../../api/index";

export default {
  name: "Login",
  components: {
    AlertTip,
  },
  data() {
    return {
      loginWay: true, //true表示验证码登录，false表示密码
      phone: "", //要验证的手机号
      code: "", //短信验证码
      countDown: 0, //倒计时
      showPwd: false, //是否显示密码
      name: "", //用户名/手机号/邮箱
      pwd: "", //密码
      captcha: "", //图形验证码
      showAlert: false, //是否显示弹窗组件
      alertText: "", //弹窗显示的内容文本
    };
  },
  computed: {
    rightPhone() {
      let regExp =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      return regExp.test(this.phone);
    },
  },

  methods: {
    //获取手机验证码
    async getCode() {
      //开启倒计时
      if (!this.countDown) {
        this.countDown = 30;
        let intervelId = setInterval(() => {
          this.countDown--;
          if (this.countDown <= 0) {
            clearInterval(intervelId);
          }
        }, 1000);
      }
      //发请求获取验证码
      let res = await reqSendCode(this.phone);
    },
    alertInfo(alertText) {
      this.alertText = alertText;
      this.showAlert = true;
    },

    //登录
    async login() {
      let res = "";
      //前台基本信息登陆验证
      if (this.loginWay) {
        //验证码登录
        if (!this.rightPhone) {
          this.alertInfo("请输入正确格式的手机号码");
        } else if (!/^\d{6}$/.test(this.code)) {
          this.alertInfo("验证码的个数不能少于6位");
        }
        //根据验证码登录
        res = await reqSmsLogin(this.phone, this.code);
      } else {
        //密码登录
        if (!this.name) {
          this.alertInfo("手机号/用户名/邮箱不能为空");
        } else if (!this.pwd) {
          this.alertInfo("密码不能为空");
        } else if (!this.captcha) {
          this.alertInfo("图形验证码不能为空");
        }
        //根据密码登录
        res = await reqPwdLogin(this.name, this.pwd, this.captcha);
      }

      //根据返回的res进行处理
      if (res.code === 0) {
        //登陆成功
        const user = res.data;
        //保存到vuex的state中
        this.$store.dispatch("getUserInfo", user);
        //前往个人中心
        this.$router.replace("./person");
      } else {
        //登陆失败
        this.changeCaptcha();
        this.alertInfo(res.msg);
      }
    },
    //关闭弹窗
    closeTip() {
      this.showAlert = false;
      this.alertText = "";
    },
    //改变图形验证码
    changeCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
  },
};
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../../assets/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 15px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 10px;
      left: 15px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 28px;
        color: #999;
      }
    }
  }
}
</style>