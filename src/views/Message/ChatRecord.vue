<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>聊天记录管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe v-show="this.curTable == '用户'">
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column
          label="名字"
          prop="userName"
          width="100"
        ></el-table-column>
        <el-table-column label="角色" width="80"
          ><template slot-scope="scope">
            <el-tag :type="judgeTag(scope.row.roleName)">{{
              scope.row.roleName
            }}</el-tag>
          </template></el-table-column
        >
        <el-table-column label="是否评委" width="80"
          ><template slot-scope="scope">
            <el-tag v-if="scope.row.roleName === '老师'">{{
              scope.row.userIsjudge
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="学校"
          prop="college"
          width="150"
        ></el-table-column>
        <el-table-column
          label="学院"
          prop="school"
          width="150"
        ></el-table-column>
        <el-table-column
          label="性别"
          prop="userSex"
          width="80"
        ></el-table-column>
        <el-table-column
          label="年龄"
          prop="userAge"
          width="80"
        ></el-table-column>
        <el-table-column
          label="电话"
          prop="userPhone"
          width="150"
        ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="searchKey"
              size="mini"
              placeholder="输入关键字搜索"
              @input="search(scope)"
            />
          </template>
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-folder"
              size="mini"
              @click="getMessageList(scope.row.userId)"
              >对话人员
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 对话人员列表区域 -->
      <el-table
        :data="messageList"
        border
        stripe
        v-show="this.curTable == '对话人员'"
      >
        <el-table-column type="index" width="120">
          <template slot="header">
            <el-button type="primary" size="mini" @click="curTable = '用户'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="名字"
          prop="userName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="最新消息内容"
          prop="messageText"
          width="450"
        ></el-table-column>
        <el-table-column
          label="最新消息时间"
          prop="messageTime"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteAllMessage(scope.row.userId)"
              >删除
            </el-button>
            <!-- 获取对话记录按钮 -->
            <el-button
              type="success"
              icon="el-icon-folder"
              size="mini"
              @click="getMessageInfor(scope.row.userId)"
              >对话记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 对话记录列表区域 -->
      <el-table
        :data="messageInforList"
        border
        stripe
        v-show="this.curTable == '对话记录'"
      >
        <el-table-column type="index" width="120">
          <template slot="header">
            <el-button type="primary" size="mini" @click="curTable = '对话人员'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="发送方名称"
          prop="fromuserName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="接受方名称"
          prop="touserName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="发送内容"
          prop="messageText"
          width="400"
        ></el-table-column>
        <el-table-column
          label="发送时间"
          prop="messageTime"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteMessage(scope.row.messageId)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ChatRecord",
  data() {
    return {
      userList: [],
      searchKey: "",
      messageList: [],
      curTable: "用户",
      messageInforList: [],
      oneUserId: "",
      anoUserId: "",
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //删除某人与某人的所有聊天记录
    async deleteAllMessage(id) {
      //弹框提示是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //如果确认删除，则返回值为字符串confirm
      //如果取消删除，则返回值为字符串cancel
      if (confirmResult !== "confirm") {
        return this.$message({
          showClose: true,
          message: "已取消删除",
          type: "info",
        });
      }
      const { data: res } = await this.$http.post("message/deletemessage", {
        fromuserId: id,
        touserId: this.oneUserId,
      });
      console.log("返回信息", res);
      this.getMessageList(this.oneUserId);
    },
    //删除某个对话信息
    async deleteMessage(id) {
      //弹框提示是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //如果确认删除，则返回值为字符串confirm
      //如果取消删除，则返回值为字符串cancel
      if (confirmResult !== "confirm") {
        return this.$message({
          showClose: true,
          message: "已取消删除",
          type: "info",
        });
      }
      const { data: res } = await this.$http.post("message/withdrawmessage", {
        messageId: id,
      });
      console.log("删除后返回信息", res);
      this.getMessageInfor(this.anoUserId);
    },
    //获取对话记录
    async getMessageInfor(id) {
      const { data: res } = await this.$http.get(
        "message/getmessage?fromuserId=" + this.oneUserId + "&touserId=" + id
      );
      this.messageInforList = res.data;
      this.anoUserId = id;
      this.curTable = "对话记录";
      console.log("所有对话记录", this.messageInforList);
    },
    //判断角色选择标签
    judgeTag(name) {
      if (name === "管理员") return "danger";
      else if (name === "老师") return "warning";
      else return "success";
    },
    //获取对话人员列表
    async getMessageList(id) {
      const { data: res } = await this.$http.get(
        "message/getmessagelist?userId=" + id
      );
      this.messageList = res.data;
      this.oneUserId = id;
      this.curTable = "对话人员";
      console.log("获取人员列表", this.messageList);
    },
    //根据关键字对用户进行搜索
    async search(scope) {
      console.log("搜索关键字", this.searchKey, scope);
      const { data: res } = await this.$http.get(
        "user/getuser?userName=" + this.searchKey
      );
      this.userList = res.data;
    },
    //获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get("user/getuser");
      this.userList = res.data;
      console.log("用户列表", this.userList);
    },
  },
};
</script>

<style></style>
