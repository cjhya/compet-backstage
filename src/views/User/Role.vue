<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-button
            type="primary"
            class="addRoleButton"
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
              @click="getRoleInfo(scope.row.id)"
              >修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeRoleByid(scope.row.id)"
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
      append-to-body
    >
      <!-- 树形控件 -->
      <el-tree
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
      roleList: [
        {
          id: "1",
          roleName: "管理员",
          roleDesc: "管理员角色描述",
        },
        {
          id: "2",
          roleName: "老师",
          roleDesc: "老师角色描述",
        },
        {
          id: "3",
          roleName: "学生",
          roleDesc: "学生角色描述",
        },
      ],
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
      //   rightslist: [],
      rightsList: [
        {
          auId: "1",
          auName: "权限管理",
          children: [
            {
              auId: "11",
              auName: "权限树",
              children: null,
            },
            {
              auId: "12",
              auName: "角色列表",
              children: null,
            },
          ],
        },
        {
          auId: "2",
          auName: "客户管理",
          children: [
            {
              auId: "21",
              auName: "客户单位列表",
              children: null,
            },
            {
              auId: "22",
              auName: "客户列表",
              children: null,
            },
          ],
        },
      ],
      //树形控件的属性绑定对象
      treeProps: {
        label: "auName",
        children: "children",
      },
      //选中节点数组
      defKeys: [],
      //正在分配权限角色Id
      roleId: "",
      //正在分配权限角色拥有权限
      aus: [],
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      console.log(123);
      const { data: res } = await this.$http.get("role/getallrole");
      console.log("全部角色", res);

      this.roleList = res.data;
    },
    //添加角色对话框
    addRoleDialogClosed() {
      this.addRoleDialogVisible = false;
      this.addRoleForm.roleName = this.addRoleForm.roleDesc = "";
    },
    async addRole() {
      const { data: res } = await this.$http.post(
        "role/addrole",
        this.addRoleForm
      );
      console.log(res);
      //隐藏添加的对话框
      this.addRoleDialogVisible = false;
      //重新获取用户的列表数据
      this.getRoleList();
    },
    //修改角色对话框
    editRoleDialogClosed() {
      this.editRoleDialogVisible = false;
      this.editRoleForm = {};
    },
    getRoleInfo(id) {
      for (let role of this.roleList) {
        if (role.id === id) {
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
    async editRole() {
      const { data: res } = await this.$http.post(
        "role/updaterole",
        this.editRoleForm
      );
      console.log(res);
      this.editRoleDialogVisible = false;
      this.getRoleList();
    },
    //根据id删除角色
    async removeRoleByid(id) {
      const { data: res } = await this.$http.post("role/deleterole", {
        roleId: id,
      });
      console.log(res);
      this.getRoleList();
    },
    async getRoleAus(role) {
      this.roleId = role.roleId;
      const { data: res } = await this.$http.get(
        "authority/getauthority/?id=" + this.roleId
      );
      this.aus = res.data;
      console.log("resres", res, this.aus);
      this.showSetRightDialog();
    },
    //展示分配权限对话框
    async showSetRightDialog() {
      //获取所有权限数据
      const { data: res } = await this.$http.get("authority/getauthority");
      console.log("right", res);
      //把获取到的权限数据保存到data中
      this.rightsList = res.data;

      this.defKeys = [];

      setTimeout(function () {}, 1);

      //递归获取三级节点ID
      console.log("rolerole", this.aus);
      for (let i = 0; i < this.aus.length; i++) {
        console.log("i:", i);
        this.getLeafKeys(this.aus[i], this.defKeys);
      }
      console.log("有的值", this.defKeys);

      this.setRightDialogVisible = true;
    },
    //根据递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys(node, arr) {
      //如果当前node节点不包含children属性，则是三级节点
      console.log("nodenode", node);

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
      console.log("123123123", keys);
      const idstr = keys.join(",");
      console.log(idstr);
      console.log({
        roleId: this.roleId,
        auArray: keys,
      });
      const { data: res } = await this.$http.post("authority/assignauthority", {
        roleId: this.roleId,
        auArray: keys,
      });
      console.log(res);
      this.getRoleList();
      this.setRightDialogVisible = false;
    },
  },
};
</script>

<style>
.el-button.addAutButton {
  margin: 10px;
}
</style>
