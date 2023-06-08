<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addClassDialogVisible = true"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 分类图 -->
      <template>
        <el-row
          :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
          v-for="(aut1, i1) in classList"
          :key="aut1.amId"
        >
          <!-- 渲染一级分类 -->
          <el-col :span="10">
            <el-tag
              closable
              @close="removeClassById(aut1.amId)"
              @click="getClassById(aut1.amId)"
              >{{ aut1.amName }}</el-tag
            >
          </el-col>
          <!-- 渲染二级分类 -->
          <el-col :span="10" bdright>
            <el-tag
              type="success"
              v-for="aut2 in aut1.children"
              :key="aut2.amId"
              closable
              @close="removeClassById(aut2.amId)"
              @click="getClassById(aut2.amId)"
            >
              {{ aut2.amName }}</el-tag
            >
          </el-col>
        </el-row>
      </template>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加活动分类"
      :visible.sync="addClassDialogVisible"
      width="30%"
      @close="addClassDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="addClassForm" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="addClassForm.amName"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-input @blur="getfalist" v-model="addClassForm.amLevel"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-select v-model="addClassForm.faAmId" placeholder="请选择">
            <el-option
              v-for="item in faList"
              :key="item.amId"
              :label="item.amName"
              :value="item.amId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="addClassDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类对话框 -->
    <el-dialog
      title="修改活动分类"
      :visible.sync="editClassDialogVisible"
      width="20%"
      @close="editClassDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="editClassForm" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="editClassForm.amName"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editClassDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ActivityClass",
  data() {
    return {
      addClassDialogVisible: false,
      classList: [],
      faList: [],
      addClassForm: {
        amName: "",
        amLevel: "",
        faAmId: "",
      },
      editClassDialogVisible: false,
      editClassForm: {
        amId: "",
        amName: "",
      },
    };
  },
  created() {
    this.getAllClass();
  },
  methods: {
    getClassById(id) {
      for (let i1 of this.classList) {
        if (i1.amId == id) {
          this.editClassForm.amId = i1.amId;
          this.editClassForm.amName = i1.amName;
          this.editClassDialogVisible = true;
          break;
        }
        for (let i2 of i1.children) {
          if (i2.amId == id) {
            this.editClassForm.amId = i2.amId;
            this.editClassForm.amName = i2.amName;
            this.editClassDialogVisible = true;
            return;
          }
        }
      }
    },
    async editClass() {
      const { data: res } = await this.$http.post(
        "activity/updateactivitymanage",
        this.editClassForm
      );
      console.log("修改返回信息", res);
      this.editClassDialogVisible = false;
      this.getAllClass();
    },
    editClassDialogClosed() {
      this.editClassForm = {
        amId: "",
        amName: "",
      };
    },
    getfalist() {
      if (this.addClassForm.amLevel == "1") {
        this.faList = this.classList;
      } else {
        this.faList = [];
      }
    },
    async addClass() {
      console.log("添加表单", this.addClassForm);
      const { data: res } = await this.$http.post(
        "activity/addactivitymanage",
        this.addClassForm
      );
      console.log("添加分类返回信息", res);
      this.getAllClass();
      this.addClassDialogVisible = false;
    },
    async removeClassById(id) {
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
      const { data: res } = await this.$http.post(
        "activity/deleteactivitymanage",
        { amId: id }
      );
      console.log("删除返回信息", res);
      this.getAllClass();
    },
    addClassDialogClosed() {
      this.addClassForm = {
        amName: "",
        amLevel: "",
        faAmId: "",
      };
      this.faList = [];
    },
    async getAllClass() {
      const { data: res } = await this.$http.get("activity/getactivitymanage");
      console.log("获取所有分类返回信息", res);
      this.classList = res.data;
    },
  },
};
</script>

<style></style>
