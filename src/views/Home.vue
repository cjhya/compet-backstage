<template>
  <div class="page">
    <header class="header">
      <div class="rightItem">
        <el-dropdown>
          <!-- <el-avatar shape="square">程家豪</el-avatar> -->
          <span class="el-dropdown-link">
            程家豪<i class="el-icon-caret-bottom el-icon--right"></i>
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
          :unique-opened="true"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409eff"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="activePathState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[subItem.id]"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menuList: [
        {
          id: 1,
          authName: "用户管理",
          children: [
            { id: 11, authName: "权限管理", path: "authority" },
            { id: 12, authName: "角色管理", path: "role" },
            { id: 13, authName: "用户信息管理", path: "user" },
          ],
        },
        {
          id: 2,
          authName: "竞赛管理",
          children: [
            { id: 21, authName: "竞赛分类管理", path: "classification" },
            { id: 22, authName: "竞赛信息管理", path: "competInfor" },
          ],
        },
        {
          id: 3,
          authName: "论坛管理",
          children: [{ id: 31, authName: "文章信息管理", path:"articleInfor"}],
        },
      ],
      activePath: "/authority",
      iconsObj: {
        1: "el-icon-user",
        11: "el-icon-lock",
        12: "el-icon-s-custom",
        13: "el-icon-user-solid",
        2: "el-icon-s-platform",
        21: "el-icon-collection-tag",
        22: "el-icon-files",
        3: "el-icon-s-order",
        31: "el-icon-document",
      },
    };
  },
  methods: {
    toHomePage(){
      this.$router.push("/homePage");
    },
    logout() {
      window.sessionStorage.clear();
      this.$message({
        showClose: true,
        message: "已退出登录",
        type: "success",
      });
      this.$router.push("/login");
    },
    activePathState(activePath){
      this.activePath=activePath
      console.log(this.activePath)
    }
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

.left .el-menu{
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
