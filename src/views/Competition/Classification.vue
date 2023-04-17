<template>
    <el-card>
    <!-- 竞赛分类列表区域 -->
    <el-table :data="classList" border stripe v-show="isShow">
      <el-table-column type="index" width="250"></el-table-column>
      <el-table-column
        label="竞赛性质"
        prop="natureName"
        width="250"
      ></el-table-column>
      <el-table-column
        label="性质描述"
        prop="natureDesc"
        width="250"
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
          <!-- 进入具体学科分类 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="inSpecificDiscipline(scope.row.natureId)"
            >具体学科
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 竞赛具体学科列表 -->
    <el-table :data="subjectList" border stripe v-show="!isShow">
      <el-table-column type="index" width="250"></el-table-column>
      <el-table-column
        label="具体学科"
        prop="subjectName"
        width="250"
      ></el-table-column>
      <el-table-column
        label="学科描述"
        prop="subjectDesc"
        width="250"
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
          <!-- 进入具体学科分类 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="isShow=!isShow"
            >返回上一级
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default{
    name:"Classification",
    data(){
        return{
            isShow:true,
            classList:[],
            subjectList:[]
        }
    },
    created(){
        this.getClassList()
    },
    methods:{
        async getClassList(){
            const{data:res}= await this.$http.get("subject/getsubject")
            console.log("竞赛性质列表",res)
            this.classList=res.data
        },
        async inSpecificDiscipline(id){
            const{data:res} = await this.$http.get("/subject/getsubject?natureId="+id)
            console.log("竞赛学科列表",res)
            this.subjectList=res.data
            this.isShow=!this.isShow
        }
    }
}
</script>

<style>

</style>