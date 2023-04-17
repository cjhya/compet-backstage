<template>
  <el-card>
    <el-row>
      <el-col>
        <el-button
          type="primary"
          class="addRoleButton"
          @click="addRoleDialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>

    <!-- 用户列表区域 -->
    <el-table :data="userList" border stripe>
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column
        label="名字"
        prop="userName"
        width="150"
      ></el-table-column>
      <el-table-column
        label="角色"
        prop="roleName"
        width="150"
      ></el-table-column>
      <el-table-column
        label="是否评委"
        prop="userIsjudge"
        width="150"
      ></el-table-column>
      <el-table-column
        label="用户名"
        prop="userAccount"
        width="150"
      ></el-table-column>
      <el-table-column
        label="性别"
        prop="userSex"
        width="150"
      ></el-table-column>
      <el-table-column
        label="年龄"
        prop="userAge"
        width="150"
      ></el-table-column>
      <el-table-column
        label="电话"
        prop="userPhone"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row.sta_id, scope.row.role)"
            >修改
          </el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeStaffByName(scope.row.sta_id, scope.row.role)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("user/getuser");
      console.log("用户列表", res);
      this.userList = res.data;
    },
  },
};
</script>

<style></style>
