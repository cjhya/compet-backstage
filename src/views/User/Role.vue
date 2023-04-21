<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="addRoleDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="getRoleInfo(scope.row.roleId)"
              >修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeRoleByid(scope.row.roleId)"
              >删除
            </el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="getRoleAus(scope.row)"
              >编辑权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="30%"
      @close="addRoleDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="addRoleForm" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            type="textarea"
            :rows="3"
            v-model="addRoleForm.roleDesc"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色对话框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editRoleDialogVisible"
      width="30%"
      @close="editRoleDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="editRoleForm" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            type="textarea"
            :rows="3"
            v-model="editRoleForm.roleDesc"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="editAuDialogClosed"
      append-to-body
    >
      <!-- 树形控件 -->
      <el-tree
        v-if="setRightDialogVisible"
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="auId"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeref"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotAuts">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      curRoleId: "",
      roleList: [],
      // roleList: [
      //   {
      //     id: "1",
      //     roleName: "管理员",
      //     roleDesc: "管理员角色描述",
      //   },
      //   {
      //     id: "2",
      //     roleName: "老师",
      //     roleDesc: "老师角色描述",
      //   },
      //   {
      //     id: "3",
      //     roleName: "学生",
      //     roleDesc: "学生角色描述",
      //   },
      // ],
      //添加对话框
      addRoleDialogVisible: false,
      addRoleForm: {
        roleName: "",
        roleDesc: "",
      },
      //修改对话框
      editRoleDialogVisible: false,
      editRoleForm: {},
      //修改权限
      setRightDialogVisible: false,
      rightsList: [
        {
          auId: "权限Id",
          auName: "示例权限",
          children: [],
        },
      ],
      //树形控件的属性绑定对象
      treeProps: {
        label: "auName",
        children: "children",
      },
      //正在分配权限选中节点数组，最后一级权限
      defKeys: [],
      //正在分配权限角色Id
      roleId: "",
      //正在分配权限角色拥有权限
      aus: [],
    };
  },
  created() {
    this.curRoleId = this.$store.getters.getUser.roleId;
    this.getRoleList();
    this.getRightList();
  },
  methods: {
    //获取所有角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get("role/getallrole");
      this.roleList = res.data;
    },
    //获取所有权限列表
    async getRightList() {
      //获取所有权限数据
      const { data: res } = await this.$http.get("authority/getauthority");
      //把获取到的权限数据保存到data中
      this.rightsList = res.data;
    },
    //添加角色对话框关闭
    addRoleDialogClosed() {
      this.addRoleDialogVisible = false;
      this.addRoleForm.roleName = this.addRoleForm.roleDesc = "";
    },
    //提交添加角色表单
    async addRole() {
      const { data: res } = await this.$http.post(
        "role/addrole",
        this.addRoleForm
      );
      //隐藏添加的对话框
      this.addRoleDialogVisible = false;
      //重新获取用户的列表数据
      this.getRoleList();
    },
    //修改角色对话框关闭
    editRoleDialogClosed() {
      this.editRoleDialogVisible = false;
      this.editRoleForm = {};
    },
    //获取该角色信息
    getRoleInfo(id) {
      for (let role of this.roleList) {
        if (role.roleId === id) {
          this.editRoleForm = {
            roleId: role.roleId,
            roleName: role.roleName,
            roleDesc: role.roleDesc,
          };
          this.editRoleDialogVisible = true;
          return;
        }
      }
    },
    //在已有信息的前提下修改并提交，重新获取角色列表
    async editRole() {
      const { data: res } = await this.$http.post(
        "role/updaterole",
        this.editRoleForm
      );
      this.editRoleForm = {};
      this.editRoleDialogVisible = false;
      this.getRoleList();
    },
    //根据id删除角色
    async removeRoleByid(id) {
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
      const { data: res } = await this.$http.post("role/deleterole", {
        roleId: id,
      });
      this.getRoleList();
    },
    editAuDialogClosed() {
      this.defKeys.splice(0, this.defKeys.length);
      this.aus.splice(0, this.aus.length);
      this.roleId = "";
      this.setRightDialogVisible = false;
    },
    //获取角色拥有权限，调用方法
    async getRoleAus(role) {
      this.roleId = role.roleId;
      const { data: res } = await this.$http.get(
        "authority/getauthority/?id=" + this.roleId
      );
      this.aus = res.data;
      this.showSetRightDialog();
    },
    //展示分配权限对话框
    async showSetRightDialog() {
      //递归获取三级节点ID
      for (let i = 0; i < this.aus.length; i++) {
        this.getLeafKeys(this.aus[i], this.defKeys);
      }
      this.setRightDialogVisible = true;
    },
    //根据递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys(node, arr) {
      //如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.auId);
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr));
    },
    //将分配的权限按id返回服务器
    async allotAuts() {
      const keys = [
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys(),
      ];
      const { data: res } = await this.$http.post("authority/assignauthority", {
        roleId: this.roleId,
        auArray: keys,
      });
      this.getRoleList();
      this.defKeys.splice(0, this.defKeys.length);
      this.aus.splice(0, this.aus.length);
      if (this.roleId === this.curRoleId) {
        this.emitRenew();
      } else {
        this.roleId = "";
      }
      this.setRightDialogVisible = false;
    },
    //触发事件传回父组件通知更新权限菜单
    emitRenew() {
      this.$emit("menuAu");
      this.roleId = "";
    },
  },
};
</script>

<style>
.el-button.addAutButton {
  margin: 10px;
}
</style>
