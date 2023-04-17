<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../assets/img-01.png" alt="IMG" />
        </div>

        <div class="login100-form validate-form">
          <span class="login100-form-title"> 后台管理系统 </span>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="text"
              placeholder="用户名"
              v-model="userName"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="el-icon-user-solid"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="password"
              placeholder="密码"
              v-model="password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="login">登陆</button>
          </div>

          <div class="text-center p-t-148"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userName: "111",
      password: "hhh",
    };
  },
  methods: {
    // async login() {
    //   console.log(123);
    //   if (!this.userName || !this.password) return;
    //   const { data: res } = await this.$http.post("login/", {
    //     userName: this.userName,
    //     password: this.password,
    //   });
    //   if (res.meta !== true) {
    //     return this.$message({
    //       showClose: true,
    //       message: "登录失败",
    //       type: "error",
    //     });
    //   }
    //   window.sessionStorage.setItem("token", res.data.userId);
    //   this.$store.dispatch("asyncUpdateUser", res.data);
    //   this.$message({
    //     showClose: true,
    //     message: "登录成功",
    //     type: "success",
    //   });
    //   this.$router.push("/home");
    // },
    login() {
      this.$message({
        showClose: true,
        message: "登录成功",
        type: "success",
      });
      this.$router.push("/home");
    },
  },
};
</script>

<style>
@import "../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
@import "../assets/css/util.css";
@import "../assets/css/main.css";
</style>
