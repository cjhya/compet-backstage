<template>
  <div class="page">
    <header class="header">
      <div class="rightItem">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toHomePage">首页</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div class="container">
      <aside class="left">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :default-active="activePath"
          :router="true"
          :collapse-transition="false"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409eff"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.auId + ''"
            v-for="item in menuList"
            :key="item.auId"
          >
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.auId]"></i>
              <!-- 文本 -->
              <span>{{ item.auName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.auPath"
              v-for="subItem in item.children"
              :key="subItem.auId"
              @click="activePathState('/' + subItem.auPath)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[subItem.auId]"></i>
                <!-- 文本 -->
                <span>{{ subItem.auName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <div class="main">
        <!-- 监听子组件触发事件 -->
        <router-view @menuAu="getMenuList"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      roleId: "",
      userName: "",
      menuList: [],
      // menuList: [
      //   {
      //     id: 1,
      //     authName: "用户管理",
      //     children: [
      //       { id: 11, authName: "权限管理", path: "authority" },
      //       { id: 12, authName: "角色管理", path: "role" },
      //       { id: 13, authName: "用户信息管理", path: "user" },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     authName: "竞赛管理",
      //     children: [
      //       { id: 21, authName: "竞赛分类管理", path: "classification" },
      //       { id: 22, authName: "竞赛信息管理", path: "competInfor" },
      //     ],
      //   },
      //   {
      //     id: 3,
      //     authName: "论坛管理",
      //     children: [{ id: 31, authName: "文章信息管理", path:"articleInfor"}],
      //   },
      // ],
      activePath: "",
      iconsObj: {
        1: "el-icon-user",
        2: "el-icon-lock",
        3: "el-icon-s-custom",
        4: "el-icon-user-solid",
        5: "el-icon-s-platform",
        6: "el-icon-collection-tag",
        7: "el-icon-files",
        8: "el-icon-s-order",
        9: "el-icon-s-flag",
        10: "el-icon-c-scale-to-original",
        11: "el-icon-bank-card",
        12: "el-icon-document",
        13: "el-icon-tickets",
        14: "el-icon-chat-round",
        15: "el-icon-data-analysis",
      },
    };
  },
  created() {
    this.roleId = this.$store.getters.getUser.roleId;
    this.userName = this.$store.getters.getUser.name;
    this.getMenuList();
  },
  methods: {
    //获取菜单权限
    async getMenuList() {
      const { data: res } = await this.$http.get(
        "authority/getauthority?id=" + this.roleId
      );
      this.menuList = res.data;
      console.log("菜单权限", this.menuList);
    },
    //返回首页
    toHomePage() {
      this.$router.push("/homePage");
      this.activePath = "";
    },
    //退出登录
    logout() {
      window.sessionStorage.clear();
      this.$message({
        showClose: true,
        message: "已退出登录",
        type: "success",
      });
      this.$router.push("/login");
    },
    //记录当前菜单
    activePathState(activePath) {
      this.activePath = activePath;
    },
  },
};
</script>

<style>
.page {
  position: fixed;
  width: 100%;
  height: 100%;
}

.header {
  height: 80px;
  background-color: #ffffff;
  color: #333;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #909399;
}

.rightItem {
  position: absolute;
  width: 100px;
  height: 60px;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.el-dropdown .el-dropdown-link {
  width: 100%;
  height: 40px;
  font-size: 18px;
  display: block;
  transform: translateY(18px);
}

.container {
  width: 100%;
  height: 100%;
  background: lightblue;
  padding-top: 60px;
  box-sizing: border-box;
}

.container .left {
  float: left;
  width: 300px;
  background-color: #304156;
  color: #333;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: auto;
  text-align: left;
  border-right: 1px solid #909399;
}

.left .el-menu {
  border-right: 0;
}

.container .main {
  height: 100%;
  background-color: #e9eef3;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: auto;
  text-align: left;
}
</style>
