<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>竞赛管理</el-breadcrumb-item>
      <el-breadcrumb-item>竞赛分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addSortDialogVisible = true"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 分类图 -->
      <template>
        <el-row
          :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
          v-for="(aut1, i1) in classList"
          :key="aut1.natureId"
        >
          <!-- 渲染一级分类 -->
          <el-col :span="10">
            <el-tag
              closable
              @close="removeNatureSortById(aut1.natureId)"
              @click="getNatureSortById(aut1.natureId)"
              >{{ aut1.natureName }}</el-tag
            >
          </el-col>
          <!-- 渲染二级分类 -->
          <el-col :span="10" bdright>
            <el-tag
              type="success"
              v-for="aut2 in aut1.children"
              :key="aut2.subjectId"
              closable
              @close="removeSubjectSortById(aut2.subjectId)"
              @click="getSubjectSortById(aut2.subjectId, aut1.natureId)"
            >
              {{ aut2.subjectName }}</el-tag
            >
          </el-col>
        </el-row>
      </template>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加权限"
      :visible.sync="addSortDialogVisible"
      width="30%"
      @close="addDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="addForm.sortName"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="addForm.sortDesc"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-input @blur="getfalist" v-model="addForm.sortLevel"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-select v-model="addForm.faSortId" placeholder="请选择">
            <el-option
              v-for="item in faList"
              :key="item.natureId"
              :label="item.natureName"
              :value="item.natureId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="addSortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSort">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editSortDialogVisible"
      width="20%"
      @close="editDialogClosed"
      append-to-body
    >
      <!-- 内容主体区域 -->
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="editForm.sortName"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="editForm.sortDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSort">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Classification",
  data() {
    return {
      addSortDialogVisible: false,
      classList: [],
      addForm: {
        sortName: "",
        sortDesc: "",
        sortLevel: "",
        faSortId: "",
      },
      faList: [],
      editSortDialogVisible: false,
      editForm: {},
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    async getClassList() {
      const { data: res } = await this.$http.get("subject/getsubject");
      this.classList = res.data;
    },
    getfalist() {
      if (this.addForm.sortLevel == "1") {
        this.faList = this.classList;
      }
    },
    addDialogClosed() {
      this.faList = [];
      this.addForm = {
        sortName: "",
        sortDesc: "",
        sortLevel: "",
        faSortId: "",
      };
    },
    async addSort() {
      if (this.addForm.sortLevel == "1") {
        const { data: res } = await this.$http.post("subject/addsubject", {
          natureId: this.addForm.faSortId,
          subjectName: this.addForm.sortName,
          subjectDesc: this.addForm.sortDesc,
        });
      } else {
        const { data: res } = await this.$http.post("subject/addnature", {
          natureName: this.addForm.sortName,
          natureDesc: this.addForm.sortDesc,
        });
      }
      this.addSortDialogVisible = false;
      this.getClassList();
    },
    editDialogClosed() {
      this.editSortDialogVisible = false;
      this.editForm = {};
    },
    getNatureSortById(id) {
      for (let nature of this.classList) {
        if (nature.natureId == id) {
          this.editForm = {
            sortName: nature.natureName,
            sortDesc: nature.natureDesc,
            natureId: id,
          };
          this.editSortDialogVisible = true;
          return;
        }
      }
    },
    getSubjectSortById(id, id2) {
      for (let nature of this.classList) {
        if (nature.children) {
          for (let subject of nature.children) {
            if (subject.subjectId == id) {
              this.editForm = {
                sortName: subject.subjectName,
                sortDesc: subject.subjectDesc,
                subjectId: id,
                natureId: id2,
              };
              this.editSortDialogVisible = true;
              return;
            }
          }
        }
      }
    },
    async editSort() {
      if (this.editForm.subjectId) {
        const { data: res } = await this.$http.post(
          "subject/updatesubject",
          {
            natureId:this.editForm.natureId,
            subjectId:this.editForm.subjectId,
            subjectName:this.editForm.sortName,
            subjectDesc:this.editForm.sortDesc
          }
        );
      } else {
        const { data: res } = await this.$http.post(
          "subject/updatenature",
          {
            natureId:this.editForm.natureId,
            natureName:this.editForm.sortName,
            natureDesc:this.editForm.sortDesc
          }
        );
      }
      this.editSortDialogVisible = false;
      this.getClassList()
    },
    async removeNatureSortById(id) {
      const { data: res } = await this.$http.post("subject/deletenature", {
        natureId: id,
      });
      this.getClassList();
    },
    async removeSubjectSortById(id) {
      const { data: res } = await this.$http.post("subject/deletesubject", {
        subjectId: id,
      });
      this.getClassList();
    },
  },
};
</script>

<style></style>
