<template>
  <e-card>
    <!-- 竞赛信息列表区域 -->
    <el-table :data="competInforList" border stripe v-show="isShow">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column
        label="竞赛名称"
        prop="absComName"
        width="150"
      ></el-table-column>
      <el-table-column
        label="竞赛简介"
        prop="absComIntroduction"
        width="150"
      ></el-table-column>
      <el-table-column
        label="主办方"
        prop="absComHost"
        width="150"
      ></el-table-column>
      <el-table-column
        label="竞赛级别"
        prop="absComLevel"
        width="150"
      ></el-table-column>
      <el-table-column
        label="学科分类"
        prop="absComsubject"
        width="150"
      ></el-table-column>
      <el-table-column
        label="联系电话"
        prop="absComPhone"
        width="150"
      ></el-table-column>
      <el-table-column
        label="电子邮箱"
        prop="absComEmail"
        width="150"
      ></el-table-column>
      <el-table-column label="操作">
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
          <!-- 查看竞赛公告 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="inSpecificAnInfor(scope.row.absComId)"
            >公告
          </el-button>
          <!-- 进入具体信息 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="inSpecificInfor(scope.row.absComId)"
            >详情信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 竞赛详情信息列表 -->
    <el-table :data="specificInforList" border stripe v-show="!isShow">
      <el-table-column type="index" width="10"></el-table-column>
      <el-table-column
        label="具体竞赛名称"
        prop="comName"
        width="110"
      ></el-table-column>
      <el-table-column
        label="报名起始时间"
        prop="comLoginstarttime"
        width="170"
      ></el-table-column>
      <el-table-column
        label="报名截至时间"
        prop="comLoginendtime"
        width="170"
      ></el-table-column>
      <el-table-column
        label="进行起始时间"
        prop="comDostarttime"
        width="170"
      ></el-table-column>
      <el-table-column
        label="进行截至时间"
        prop="comDoendtime"
        width="170"
      ></el-table-column>
      <el-table-column
        label="创建者"
        prop="comTeacher"
        width="100"
      ></el-table-column>
      <el-table-column
        label="参赛类型"
        prop="comType"
        width="100"
      ></el-table-column>
      <el-table-column label="操作">
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
          <!-- 返回上一级 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            >查看具体参赛记录
          </el-button>
          <!-- 查看优秀作品 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="isShow = !isShow"
            >查看优秀作品
          </el-button>
          <!-- 返回上一级 -->
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
  </e-card>
</template>

<script>
export default {
  name: "CompetInfor",
  data() {
    return {
      isShow: true,
      competInforList: [],
      specificInforList: [],
    };
  },
  created() {
    this.getCompetInforList();
  },
  methods: {
    async getCompetInforList() {
      const { data: res } = await this.$http.get(
        "competition/getcompetitionmeta"
      );
      console.log("竞赛信息", res);
      this.competInforList = res.data;
    },
    async inSpecificInfor(id) {
      const { data: res } = await this.$http.get(
        "competition/getcompetition?absComId=" + id
      );
      console.log("具体信息", res);
      this.specificInforList = res.data;
      this.isShow=!this.isShow
    },
  },
};
</script>

<style></style>
