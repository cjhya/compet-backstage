<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>论坛管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 论坛文章列表区域 -->
      <el-table :data="articleInforList" border stripe v-show="isShow">
        <el-table-column type="index" width="150"></el-table-column>
        <el-table-column
          label="文章标题"
          prop="artName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="发表者"
          prop="artUser"
          width="150"
        ></el-table-column>
        <el-table-column
          label="发表时间"
          prop="artPosttime"
          width="150"
        ></el-table-column>
        <el-table-column
          label="文章内容"
          prop="artContent"
          width="150"
        ></el-table-column>
        <el-table-column
          label="阅读量"
          prop="readcount"
          width="150"
        ></el-table-column>
        <el-table-column
          label="点赞量"
          prop="artApprove"
          width="150"
        ></el-table-column>
        <el-table-column
          label="踩"
          prop="artDisapprove"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="inSpecificComment(scope.row.artId)"
              >查看评论
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 评论列表区域 -->
      <el-table :data="comments" border stripe v-show="!isShow">
        <el-table-column type="index" width="250"></el-table-column>
        <el-table-column
          label="发表者"
          prop="commUser"
          width="150"
        ></el-table-column>
        <el-table-column
          label="发表内容"
          prop="commContent"
          width="150"
        ></el-table-column>
        <el-table-column
          label="发表时间"
          prop="commPosttime"
          width="150"
        ></el-table-column>
        <el-table-column
          label="回复者"
          prop="touser"
          width="150"
        ></el-table-column>
        <el-table-column
          label="点赞量"
          prop="commApprove"
          width="150"
        ></el-table-column>
        <el-table-column
          label="踩"
          prop="commDisapprove"
          width="150"
        ></el-table-column>
        <el-table-column
          label="电子邮箱"
          prop="absComEmail"
          width="150"
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
            <!-- 查看评论信息 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="isShow = !isShow"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleInfor",
  data() {
    return {
      isShow: true,
      articleInforList: [],
      comments: [],
    };
  },
  created() {
    this.getArticleInfor();
  },
  methods: {
    async getArticleInfor() {
      const { data: res } = await this.$http.get("/forum/getarticle");
      console.log("文章信息", res);
      this.articleInforList = res.data;
    },
    async removeArtById(id) {
      const { data: res } = await this.$http.post("/forum/deletearticle", {
        artId: id,
      });
      console.log("删除文章返回信息", res);
      this.getArticleInfor();
    },
    async inSpecificComment(id) {
      const { data: res } = await this.$http.get(
        "/forum/getcomment?artId=" + id
      );
      console.log("具体评论", res);
      this.comments = res.data;
      this.isShow = !this.isShow;
    },
    async removeCommentById(id) {
      const { data: res } = this.$http.post("/forum/deletecomment", {
        commId: id,
      });
      console.log("删除评论返回信息", res);
      this.inSpecificComment(id);
    },
  },
};
</script>

<style></style>
