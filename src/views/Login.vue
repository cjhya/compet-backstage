<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../assets/img-01.png" alt="IMG" />
        </div>

        <div class="login100-form validate-form">
          <span class="login100-form-title"> 高校学科竞赛后台管理系统 </span>

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
            <button class="login100-form-btn" @click="login">登录</button>
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
      password: "123456",
    };
  },
  methods: {
    async login() {
      if (!this.userName || !this.password) return;
      const { data: res } = await this.$http.post("login/", {
        userName: this.userName,
        password: this.password,
      });
      console.log("登录返回信息", res);
      if (res.meta !== true) {
        return this.$message({
          showClose: true,
          message: "登录失败",
          type: "error",
        });
      }
      if (res.data.roleName !== "管理员") {
        return this.$message({
          showClose: true,
          message: "非管理员不能登录后台管理系统",
          type: "error",
        });
      }
      window.sessionStorage.setItem("token", res.data.userId);
      console.log("登录返回信息", res.data);
      this.$store.dispatch("asyncUpdateUser", res.data);
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
