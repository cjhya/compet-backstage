<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>论坛管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="chooseDialog"
            :disabled="this.curTable != '文章列表'"
            >添加信息</el-button
          >
        </el-col>
      </el-row>
      <!-- 论坛文章列表区域 -->
      <el-table
        :data="articleInforList"
        border
        stripe
        v-show="curTable == '文章列表'"
        id="artInfor"
      >
        <el-table-column type="index" width="80"> </el-table-column>
        <el-table-column
          label="文章标题"
          prop="artName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="文章内容"
          prop="artContent"
          width="250"
        ></el-table-column>
        <el-table-column
          label="发表者"
          prop="artUser"
          width="80"
        ></el-table-column>
        <el-table-column
          label="发表时间"
          prop="artPosttime"
          width="140"
        ></el-table-column>
        <el-table-column
          label="阅读量"
          prop="readcount"
          width="80"
        ></el-table-column>
        <el-table-column
          label="点赞量"
          prop="artApprove"
          width="80"
        ></el-table-column>
        <el-table-column
          label="踩"
          prop="artDisapprove"
          width="80"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="searchKey"
              size="mini"
              placeholder="输入关键字搜索"
              @input="search(scope)"
            />
          </template>
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showArtEditDialog(scope.row.artId)"
            >
              修改
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeArtById(scope.row.artId)"
            >
              删除
            </el-button>
            <!-- 查看评论信息 -->
            <el-button
              type="success"
              icon="el-icon-crop"
              size="mini"
              @click="inSpecificComment(scope.row.artId)"
              >查看主评论
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 主评论列表区域 -->
      <el-table
        :data="mainComments"
        border
        stripe
        v-show="curTable == '主评论列表'"
        id="mainComment"
      >
        <el-table-column type="index" width="120" align="center">
          <template slot="header">
            <el-button type="primary" size="mini" @click="curTable = '文章列表'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="发表者"
          prop="commUser"
          width="100"
        ></el-table-column>
        <el-table-column
          label="发表内容"
          prop="commContent"
          width="300"
        ></el-table-column>
        <el-table-column
          label="发表时间"
          prop="commPosttime"
          width="140"
        ></el-table-column>
        <el-table-column
          label="回复者"
          prop="touser"
          width="100"
        ></el-table-column>
        <el-table-column
          label="点赞量"
          prop="commApprove"
          width="100"
        ></el-table-column>
        <el-table-column
          label="踩"
          prop="commDisapprove"
          width="100"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeCommentById(scope.row.commId)"
            >
              删除
            </el-button>
            <!-- 查看次评论信息 -->
            <el-button
              type="primary"
              icon="el-icon-folder"
              size="mini"
              @click="inSecondaryComment(scope.row.soncomment)"
              >查看次评论
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 次评论列表区域 -->
      <el-table
        :data="secondaryComments"
        border
        stripe
        v-show="curTable == '次评论列表'"
        id="secondaryCom"
      >
        <el-table-column type="index" width="120" align="center">
          <template slot="header">
            <el-button
              type="primary"
              size="mini"
              @click="curTable = '主评论列表'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="发表者"
          prop="commUser"
          width="100"
        ></el-table-column>
        <el-table-column
          label="发表内容"
          prop="commContent"
          width="300"
        ></el-table-column>
        <el-table-column
          label="发表时间"
          prop="commPosttime"
          width="140"
        ></el-table-column>
        <el-table-column
          label="回复者"
          prop="touser"
          width="100"
        ></el-table-column>
        <el-table-column
          label="点赞量"
          prop="commApprove"
          width="100"
        ></el-table-column>
        <el-table-column
          label="踩"
          prop="commDisapprove"
          width="100"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeCommentById(scope.row.commId)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加文章对话框 -->
      <el-dialog
        title="添加文章"
        :visible.sync="addArtDialog"
        width="50%"
        @close="addArtDialogClosed"
        append-to-body
        id="ann"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addArtForm" label-width="100px">
          <el-form-item label="文章标题">
            <el-input v-model="addArtForm.artName"></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <Editor ref="artEditor" />
          </el-form-item>
          <el-form-item label="创建者">
            <el-select v-model="addArtForm.userId" placeholder="请选择">
              <el-option
                v-for="item in users"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addArtDialog = false">取 消</el-button>
          <el-button type="primary" @click="addArticle">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改文章对话框 -->
      <el-dialog
        title="修改文章"
        :visible.sync="editArtDialog"
        width="50%"
        @close="editArtDialogClosed"
        append-to-body
        id="editAnn"
      >
        <!-- 内容主体区域 -->
        <el-form :model="editArtForm" label-width="100px">
          <el-form-item label="文章标题">
            <el-input v-model="editArtForm.artName"></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <Editor ref="artEditEditor" />
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editArtDialog = false">取 消</el-button>
          <el-button type="primary" @click="editArt">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Editor from "../../components/Editor.vue";
export default {
  name: "ArticleInfor",
  components: { Editor },
  data() {
    return {
      //文章搜索关键字
      searchKey: "",
      //文章列表
      articleInforList: [],
      //主评论列表
      mainComments: [],
      //次评论列表
      secondaryComments: [],
      //当前操作文章Id
      artId: "",
      //当前操作主评论Id
      mainCommentId: "",
      //当前表格， "文章列表" "主评论列表" "次评论列表"
      curTable: "文章列表",
      //添加文章对话框
      addArtDialog: false,
      //修改文章对话框
      editArtDialog: false,
      //添加主评论对话框
      addMainCommentDialog: false,
      //添加次评论对话框
      addSecondaryCommentDialog: false,
      //所有用户
      users: [],
      //添加文章表单
      addArtForm: {
        artName: "",
        userId: "",
      },
      editArtForm: {
        artName: "",
        artContent: "",
      },
    };
  },
  created() {
    this.getAllUsers();
    this.getArticleInfor();
  },
  methods: {
    //打开修改文章对话框
    showArtEditDialog(id) {
      for (let art of this.articleInforList) {
        if (art.artId == id) {
          this.editArtForm = {
            artId: id,
            artName: art.artName,
          };
          //定时器模拟异步操作
          setTimeout(() => {
            this.$refs.artEditEditor.html = art.artContent;
          });
          this.editArtDialog = true;
          return;
        }
      }
    },
    //添加文章
    async addArticle() {
      const { data: res } = await this.$http.post("forum/addarticle", {
        artName: this.addArtForm.artName,
        userId: this.addArtForm.userId,
        artContent: this.$refs.artEditor.html,
      });
      this.addArtDialog = false;
      this.getArticleInfor();
    },
    //转换添加对话框显示
    chooseDialog() {
      switch (this.curTable) {
        case "文章列表":
          this.addArtDialog = true;
          break;
        case "主评论列表":
          this.addMainCommentDialog = true;
          break;
        case "次评论列表":
          this.addSecondaryCommentDialog = true;
          break;
      }
    },
    //修改文章
    async editArt() {
      const { data: res } = await this.$http.post("forum/updatearticle", {
        artId: this.editArtForm.artId,
        artName: this.editArtForm.artName,
        artContent: this.$refs.artEditEditor.html,
      });
      this.editArtDialog = false;
      this.getArticleInfor();
    },
    //获取所有用户
    async getAllUsers() {
      const { data: res } = await this.$http.get("user/getuser");
      this.users = res.data;
    },
    //添加文章对话框关闭
    addArtDialogClosed() {
      this.$refs.artEditor.html = "";
      this.addArtForm = {
        artName: "",
        userId: "",
      };
    },
    //修改文章对话框关闭
    editArtDialogClosed() {
      this.$refs.artEditEditor.html = "";
      this.editArtForm = {
        artName: "",
      };
    },
    //获取文章列表
    async getArticleInfor() {
      const { data: res } = await this.$http.get("/forum/getarticle");
      this.articleInforList = res.data;
    },
    //搜索获取文章
    async search(scope) {
      const { data: res } = await this.$http.get(
        "forum/getarticle?query=" + this.searchKey
      );
      this.articleInforList = res.data;
    },
    //根据Id删除文章
    async removeArtById(id) {
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
      const { data: res } = await this.$http.post("forum/deletearticle", {
        artId: id,
      });
      this.getArticleInfor();
    },
    //根据文章id获取所有主评论
    async inSpecificComment(id) {
      const { data: res } = await this.$http.get(
        "/forum/getcomment?artId=" + id
      );
      this.mainComments = res.data;
      this.curTable = "主评论列表";
      this.artId = id;
    },
    //根据id删除评论
    async removeCommentById(id) {
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
      const { data: res } = this.$http.post("forum/deletecomment", {
        commId: id,
      });
      this.inSpecificComment(this.artId);
    },
    //查看次评论
    inSecondaryComment(coms) {
      this.secondaryComments = coms;
      this.curTable = "次评论列表";
    },
  },
};
</script>

<style>
#artInfor .el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}
#mainComment .el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}
#secondaryCom .el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}
</style>
