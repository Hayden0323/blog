/* 登录框组件 */
<template>
  <div class="login-box">
    <el-form ref="loginForm" :rules="rules" :model="loginForm">
      <h2 class="login-title">欢迎登录</h2>
      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="loginForm.username"
          @keyup.enter.native="handleLogin"
        >
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="passwordType"
          placeholder="请输入密码"
          v-model="loginForm.password"
          @keyup.enter.native="handleLogin"
        >
          <i
            class="el-icon-view el-input__icon"
            :style="fontstyle"
            slot="suffix"
            @click="showPassword"
          ></i>
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifycode">
        <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
        <el-input
          v-model="loginForm.verifycode"
          placeholder="请输入验证码"
          class="identifyinput"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="identifybox">
          <div @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
          <el-button @click="refreshCode" type="text" class="textbtn">看不清，换一张</el-button>
        </div>
      </el-form-item>
      <div class="login-check">
        <el-checkbox v-model="checked">记住我</el-checkbox>
      </div>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SIdentify from "./SIdentify";
export default {
  components: {
    SIdentify
  },
  data() {
    //账号验证规则
    const usernameVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    //密码验证规则
    const passwordVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        verifycode: ""
      },
      //表单验证，需要在 el-form-item 元素中增加prop属性
      rules: {
        username: [
          { required: true, trigger: "blur", validator: usernameVerify }
        ],
        password: [
          { required: true, trigger: "blur", validator: passwordVerify }
        ]
      },
      identifyCode: "",
      identifyCodes: "1234567890",
      fontstyle: {
        color: ""
      },
      checked: false,
      passwordType: "password"
    };
  },
  created() {
    // 验证码初始化、账号密码读取sessionStorage
    this.identifyCode = "";
    this.loginForm.username = sessionStorage.getItem("username");
    this.loginForm.password = sessionStorage.getItem("password");
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    // 通过改变input的type使密码可见
    showPassword() {
      this.fontstyle.color == ""
        ? (this.fontstyle.color = "red")
        : (this.fontstyle.color = ""); // 改变密码可见按钮颜色
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    // 登录操作
    async handleLogin() {
      if (this.loginForm.verifycode === "") {
        this.$refs.loginForm.fields[2].error = "请输入验证码";
      } else if (this.loginForm.verifycode !== this.identifyCode) {
        this.$refs.loginForm.fields[2].error = "验证码不正确！";
      } else {
        const res = await this.$http.post("login", this.loginForm);
        if (res.data.message === "422") {
          this.$refs.loginForm.fields[0].error = "账号或密码错误";
          this.$refs.loginForm.fields[1].error = "账号或密码错误";
        } else {
          if (this.checked) {
            sessionStorage.setItem("username", this.loginForm.username);
            sessionStorage.setItem("password", this.loginForm.password);
          }
          localStorage.token = res.data.token;
          localStorage.username = res.data.username;
          this.$router.push("/main");
        }
      }
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  }
};
</script>

<style lang="scss">
.login-box {
  border: 1px solid #dcdfe6;
  width: 500px;
  padding: 60px;
  box-sizing: border-box;
  border-radius: 0 5px 5px 0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}
.login-title {
  display: flex;
  justify-content: center;
  margin: 0 auto 40px auto;
  text-shadow: 0 2px 3px rgba(255, 255, 255, 0.2);
}
.el-input__icon:hover {
  cursor: pointer;
  color: #000;
}
.login-button {
  width: 100%;
  padding: 0.6rem;
  font-size: 1.1rem;
}
.identifybox {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 7px;
}
.login-check {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}
</style>