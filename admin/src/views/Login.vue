<template>
  <div class="login">
    <div class="login_sidebox">
      <div class="login_sidebox_header">
        <h1 class="login_sidebox_title">
          VBlog</h1>
        <h2 class="login_sidebox_subtitle">个人技术博客后台管理平台</h2>
      </div>
      <div class="login_sidebox_comments">
        <span>平台用途</span>
      </div>
      <div class="login_sidebox_container">
        管理个人博客所需的资源，包括博客标题、博客内容、文件上传、富文本编辑等，完善的博客运营解决方案
      </div>
      <div class="login_sidebox_footer">
        专业个人博客运营方案
      </div>
    </div>
    <div class="login_box">
      <login-box></login-box>
    </div>
    <div class="bg_img"></div>
  </div>
</template>

<script>
import LoginBox from '../components/Login/LoginBox'
export default {
  components: {
    LoginBox
  }
}
</script>

<style lang="scss">
.login {
  background-color: #f7f7f7;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
.login_sidebox {
  height: 562px;
  width: 500px;
  box-sizing: border-box;
  background: url("../assets/bg-sidebox-1.png") no-repeat 0 0,
    url("../assets/bg-sidebox-2.png") no-repeat 100% 100%,
    linear-gradient(0deg, #3a485a 0%, #607089 100%);
  border-radius: 5px 0 0 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 60px;
  z-index: 99;
}
.login_sidebox_title {
  display: flex;
  justify-content: flex-start;
  font-size: 1.5rem;
  align-items: center;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
.login_sidebox_subtitle {
  font-weight: normal;
  display: flex;
  justify-content: flex-start;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
.login_sidebox_comments {
  color: #fff;
  opacity: 0.6;
  display: flex;
  justify-content: flex-start;
  margin-top: 3rem;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}
.login_sidebox_container {
  display: flex;
  justify-content: flex-start;
  font-size: 15px;
  line-height: 1.6rem;
  text-align: left;
  margin-top: 1rem;
  height: 215px;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
}
.login_sidebox_footer {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px 0;
  font-size: 15px;
  display: flex;
  justify-content: flex-start;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}
.login_box {
  z-index: 99;
}
.bg_img {
  position: absolute;
  width: 487px;
  height: 412px;
  background-image: url("../assets/bg-bottom-right.png");
  z-index: 1;
  right: 0;
  bottom: 0;
}
</style>