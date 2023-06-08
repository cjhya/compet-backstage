<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addUserDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          label="名字"
          prop="userName"
          width="60"
        ></el-table-column>
        <el-table-column label="角色" width="70"
          ><template slot-scope="scope">
            <el-tag
              :type="judgeTag(scope.row.roleName)"
              style="margin: 0 auto"
              >{{ scope.row.roleName }}</el-tag
            >
          </template></el-table-column
        >
        <el-table-column label="评委" width="60"
          ><template slot-scope="scope">
            <el-tag
              v-if="scope.row.roleName === '老师'"
              style="margin: 0 auto"
              >{{ scope.row.userIsjudge }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="userAccount"
          width="60"
        ></el-table-column>
        <el-table-column
          label="密码"
          prop="userPassword"
          width="100"
        ></el-table-column>
        <el-table-column
          label="性别"
          prop="userSex"
          width="45"
        ></el-table-column>
        <el-table-column
          label="年龄"
          prop="userAge"
          width="45"
        ></el-table-column>
        <el-table-column
          label="学校"
          prop="college"
          width="90"
        ></el-table-column>
        <el-table-column
          label="学校"
          prop="school"
          width="90"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="userEmail"
          width="100"
        ></el-table-column>
        <el-table-column
          label="电话"
          prop="userPhone"
          width="100"
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
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.userId)"
              >修改
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.userId)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="30%"
        @close="addDialogClosed"
        append-to-body
        ref="addUserFormRef"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addUserForm" label-width="80px">
          <el-form-item label="上传头像">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="httpRequest"
              ref="uploadAva"
              :auto-upload="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus"
                style="
                  font-size: 28px;
                  color: #8c939d;
                  width: 100px;
                  height: 100px;
                  line-height: 100px;
                  text-align: center;
                "
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="addUserForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="addUserForm.userAccount"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addUserForm.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="addUserForm.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="addUserForm.userSex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="addUserForm.userAge"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="addUserForm.college"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="addUserForm.school"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addUserForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="addUserForm.userPhone"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户信息对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editUserDialogVisible"
        width="30%"
        @close="editDialogClosed"
        append-to-body
      >
        <!-- 内容主体区域 -->
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="editForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="editForm.userAccount"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editForm.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="editForm.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="editForm.userSex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="editForm.userAge"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="editForm.college"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="editForm.school"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="editForm.userPhone"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      searchKey: "",
      userList: [],
      addUserDialogVisible: false,
      addUserForm: {
        userName: "",
        userAccount: "",
        userPassword: "",
        roleId: "",
        userSex: "",
        userAge: "",
        userPhone: "",
        userEmail: "",
        college: "",
        school: "",
      },
      roleList: [],
      editUserDialogVisible: false,
      editForm: {
        userId: "",
        userName: "",
        userAccount: "",
        userPassword: "",
        roleId: "",
        userSex: "",
        userAge: "",
        userPhone: "",
        userEmail: "",
        college: "",
        school: "",
      },
      //上传头像
      avaFile: "",
      imageUrl: "",
    };
  },
  created() {
    this.getUserList();
    this.getRoles();
  },
  methods: {
    async uploadAvater(id) {
      this.$refs.uploadAva.submit();
      let fd = new FormData();
      fd.append("userId", id);
      fd.append("headpicture", this.avaFile);

      const { data: res } = await this.$http.post("user/uploadheadpicture", fd);
      console.log("上传头像返回信息", res);
      this.getUserList();
    },
    httpRequest(param) {
      this.avaFile = param.file;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("图片路径", this.imageUrl);
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
    //判断角色选择标签
    judgeTag(name) {
      if (name === "管理员") return "danger";
      else if (name === "老师") return "warning";
      else return "success";
    },
    //获取角色列表
    async getRoles() {
      const { data: res } = await this.$http.get("role/getallrole");
      this.roleList = res.data;
    },
    //添加对话框关闭方法
    addDialogClosed() {
      this.addUserForm = {
        userName: "",
        userAccount: "",
        userPassword: "",
        roleId: "",
        userSex: "",
        userAge: "",
        userPhone: "",
        userEmail: "",
        college: "",
        school: "",
      };
      this.addUserDialogVisible = false;
    },
    //添加用户
    async addUser() {
      const { data: res } = await this.$http.post(
        "user/adduser",
        this.addUserForm
      );
      this.addUserDialogVisible = false;
      this.uploadAvater(res.userId);
    },
    //修改对话框关闭方法
    editDialogClosed() {
      this.editForm = {};
      this.editUserDialogVisible = false;
    },
    //通过ID删除用户
    async removeUserById(id) {
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
      const { data: res } = await this.$http.post("user/deleteuser", {
        userId: id,
      });
      this.getUserList();
    },
    showEditDialog(id) {
      for (let user of this.userList) {
        if (user.userId === id) {
          console.log("用户信息", user);
          this.editForm = {
            userId: user.userId,
            userName: user.userName,
            userAccount: user.userAccount,
            userPassword: user.userPassword,
            roleId: user.roleId,
            userSex: user.userSex,
            userAge: user.userAge,
            userPhone: user.userPhone,
            college: user.college,
            school: user.school,
            userEmail: user.userEmail,
          };
        }
      }
      this.editUserDialogVisible = true;
    },
    async editUser() {
      const { data: res } = await this.$http.post(
        "user/updateuser",
        this.editForm
      );
      console.log("修改用户信息返回信息", res);
      this.editUserDialogVisible = false;
      this.getUserList();
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
