<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-button
            type="primary"
            class="addAutButton"
            @click="addDialogVisible = true"
            >添加权限</el-button
          >
        </el-col>
      </el-row>
      <!-- 权限图 -->
      <template>
        <el-row
          :class="[
            'bdbottom',
            'bdleft',
            'bdright',
            i1 === 0 ? 'bdtop' : '',
            'vcenter',
          ]"
          v-for="(aut1, i1) in autTree"
          :key="aut1.id"
        >
          <!-- 渲染一级权限 -->
          <el-col :span="10">
            <el-tag
              closable
              @close="removeAutById(aut1.id)"
              @click="getAutById(aut1.id)"
              >{{ aut1.auName }}</el-tag
            >
          </el-col>
          <!-- 渲染二级权限 -->
          <el-col :span="10" bdright>
            <el-row v-for="aut2 in aut1.children" :key="aut2.id">
              <el-tag
                type="success"
                closable
                @close="removeAutById(aut2.id)"
                @click="getAutById(aut2.id)"
              >
                {{ aut2.auName }}</el-tag
              >
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-card>

    <!-- 添加权限对话框 -->
    <el-dialog
      title="添加权限"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="addForm.auName"></el-input>
        </el-form-item>
        <el-form-item label="权限等级">
          <el-input @blur="getfalist" v-model="addForm.auLevel"></el-input>
        </el-form-item>
        <el-form-item label="父权限名称">
          <el-select v-model="addForm.faAuId" placeholder="请选择">
            <el-option
              v-for="item in faList"
              :key="item.id"
              :label="item.auName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="addForm.auPath"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAut">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改权限对话框 -->
    <el-dialog
      title="修改权限"
      :visible.sync="editDialogVisible"
      width="20%"
      @close="editDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="editForm.auName"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="editForm.auPath"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Authority",
  data() {
    return {
      autTree: [
        {
          id: "1",
          auName: "用户管理",
          children: [
            {
              id: "11",
              auName: "权限管理",
              children: null,
            },
            {
              id: "12",
              auName: "角色管理",
              children: null,
            },
            {
              id: "13",
              auName: "用户信息管理",
              children: null,
            },
          ],
        },
        {
          id: "2",
          auName: "竞赛管理",
          children: [
            {
              id: "21",
              auName: "竞赛分类管理",
              children: null,
            },
            {
              id: "22",
              auName: "竞赛信息管理",
              children: null,
            },
          ],
        },
        {
          id: "3",
          auName: "论坛管理",
          children: [
            {
              id: "31",
              auName: "文章信息管理",
              children: null,
            },
          ],
        },
      ],
      //添加对话框
      addDialogVisible: false,
      addForm: {
        auName: "",
        auLevel: "",
        faAuId: "",
        auPath: "",
      },
      faList: [],
      //修改对话框
      editDialogVisible: false,
      editForm: {},
    };
  },
  methods: {
    created() {
      //   this.getAutTree();
    },
    //获取权限树
    async getAutTree() {
      const { data: res } = await this.$http.get("authority/getauthority");
      this.autTree = res.data;
    },
    //添加对话框方法
    async getfalist() {
      if (this.addForm.auLevel !== "0") {
        const { data: res } = await this.$http.get(
          "authority/getauthority/?auLevel=" + this.addForm.auLevel
        );

        this.faList = res.data;
      }
    },
    addDialogClosed() {
      this.addDialogVisible = false;
      this.addForm.auName =
        this.addForm.auLevel =
        this.addForm.faAuId =
        this.addForm.auPath =
          "";
    },
    async addAut() {
      //可以发起添加权限的网络请求
      const { data: res } = await this.$http.post(
        "authority/addauthority",
        this.addForm
      );
      //隐藏添加的对话框
      this.addDialogVisible = false;
      //重新获取所有权限数据
      this.getAutTree();
    },
    //修改对话框方法
    getAutById(id) {
      console.log(id);
      for (let au of this.autTree) {
        if (au.id == id) {
          this.editForm = { auName: au.auName, auPath: "" };
          this.editDialogVisible = true;
          console.log(au, au.id, id);
          console.log(this.editForm);
          return;
        }
        if (au.children) {
          for (let au1 of au.children) {
            if (au1.id == id) {
              this.editForm = { auName: au1.auName, auPath: au1.auPath };
              this.editDialogVisible = true;
              console.log(au1, au1.id, id);
              console.log(this.editForm);
              return;
            }
          }
        }
      }
    },
    editDialogClosed() {
      this.editDialogVisible = false;
      this.editForm = {};
    },
    async editAut() {
      const { data: res } = await this.$http.post(
        "authority/updateauthority",
        this.editForm
      );

      this.getAutTree();
      this.editDialogVisible = false;
    },
    //删除权限方法
    async removeAutById(id) {
      //弹框提示是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
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
      //执行确认删除的操作
      const { data: res } = await this.$http.post(
        "/authority/deleteroleauthority",
        {
          auId: id,
        }
      );
      if (res.meta !== true) {
        return this.$message({
          showClose: true,
          message: "删除权限失败",
          type: "error",
        });
      }
      this.$message({
        showClose: true,
        message: "删除权限成功",
        type: "success",
      });
      console.log(res);
    },
  },
};
</script>

<style>
.el-button.addAutButton {
  margin: 10px;
}

.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #909399;
}

.bdbottom {
  border-bottom: 1px solid #909399;
}

.bdleft {
  border-left: 1px solid #909399;
  margin-left: 5px;
}

.bdright {
  border-right: 1px solid #909399;
  margin-right: 5px;
}

.vcenter {
  display: flex;
  align-items: center;
}
.el-row .el-col {
  margin: 0 auto;
}
</style>
