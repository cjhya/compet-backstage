<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动信息管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addActDialogVisible = true"
            >添加信息</el-button
          >
        </el-col>
      </el-row>

      <!-- 活动信息列表区域 -->
      <el-table :data="actInforList" border stripe>
        <el-table-column type="index" width="30"></el-table-column>
        <el-table-column
          label="活动名称"
          prop="activityName"
          width="100"
        ></el-table-column>
        <el-table-column
          label="活动简介"
          prop="activityIntro"
          width="100"
          :formatter="stateFormat"
        ></el-table-column>
        <el-table-column
          label="主办方"
          prop="activityHost"
          width="60"
        ></el-table-column>
        <el-table-column
          label="报名开始时间"
          prop="activityLoginstarttime"
          width="60"
        ></el-table-column>
        <el-table-column
          label="报名结束时间"
          prop="activityLoginendtime"
          width="60"
        ></el-table-column>
        <el-table-column
          label="活动开始时间"
          prop="activityDostarttime"
          width="60"
        ></el-table-column>
        <el-table-column
          label="活动结束时间"
          prop="activityDoendtime"
          width="60"
        ></el-table-column>
        <el-table-column
          label="链接"
          prop="activityLink"
          width="50"
        ></el-table-column>
        <el-table-column
          label="分类"
          prop="activityInterest"
          width="50"
        ></el-table-column>
        <el-table-column
          label="级别"
          prop="activityLevel"
          width="50"
        ></el-table-column>
        <el-table-column
          label="方式"
          prop="activityWay"
          width="50"
        ></el-table-column>
        <el-table-column
          label="发起人"
          prop="activityTeacherName"
          width="60"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          prop="activityPhone"
          width="70"
        ></el-table-column>
        <el-table-column
          label="联系邮箱"
          prop="activityGroup"
          width="70"
        ></el-table-column>
        <el-table-column
          label="所有名额"
          prop="allnumber"
          width="50"
        ></el-table-column>
        <el-table-column
          label="剩余名额"
          prop="remainnumber"
          width="50"
        ></el-table-column>
        <el-table-column
          label="活动状态"
          prop="state"
          width="50"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="showActEditDialog(scope.row.activityId)"
              >修改
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              @click="removeActById(scope.row.activityId)"
              style="margin: 10px 0"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加活动对话框 -->
      <el-dialog
        title="添加活动"
        :visible.sync="addActDialogVisible"
        width="50%"
        @close="addActDialogClosed"
        append-to-body
      >
        <!-- 内容主体区域 -->
        <el-form
          :model="actForm"
          label-width="100px"
          style="margin: 10px auto; width: 500px"
        >
          <el-form-item label="上传图片">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="httpRequest"
              ref="uploadPic"
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
          <el-form-item label="活动名称">
            <el-input v-model="actForm.activityName"></el-input
          ></el-form-item>
          <el-form-item label="活动简介">
            <Editor ref="actInforEditor" />
          </el-form-item>
          <el-form-item label="主办方">
            <el-input v-model="actForm.activityHost"></el-input
          ></el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="actForm.activityPhone"></el-input
          ></el-form-item>
          <el-form-item label="QQ群">
            <el-input v-model="actForm.activityGroup"></el-input
          ></el-form-item>
          <el-form-item label="级别">
            <el-select v-model="actForm.activityLevel" placeholder="请选择">
              <el-option
                v-for="item in levels"
                :key="item.way"
                :label="item.way"
                :value="item.way"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="actForm.activityLink"></el-input
          ></el-form-item>
          <el-form-item label="方式">
            <el-select v-model="actForm.activityWay" placeholder="请选择">
              <el-option
                v-for="item in ways"
                :key="item.way"
                :label="item.way"
                :value="item.way"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="actForm.activityInterest" placeholder="请选择">
              <el-option
                v-for="item in ints"
                :key="item.amId"
                :label="item.amName"
                :value="item.amName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布人">
            <el-select v-model="actForm.activityTeacherId" placeholder="请选择">
              <el-option
                v-for="item in teachers"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报名开始时间">
            <el-date-picker
              v-model="actForm.activityLoginstarttime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名结束时间">
            <el-date-picker
              v-model="actForm.activityLoginendtime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动开始时间">
            <el-date-picker
              v-model="actForm.activityDostarttime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动结束时间">
            <el-date-picker
              v-model="actForm.activityDoendtime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所有名额">
            <el-input v-model="actForm.allnumber"></el-input
          ></el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer">
          <el-button @click="addActDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="postAct">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改活动对话框 -->
      <el-dialog
        title="修改活动"
        :visible.sync="editActDialogVisible"
        width="50%"
        @close="editActDialogClosed"
        append-to-body
      >
        <!-- 内容主体区域 -->
        <el-form
          :model="editForm"
          label-width="100px"
          style="margin: 10px auto; width: 500px"
        >
          <el-form-item label="活动名称">
            <el-input v-model="editForm.activityName"></el-input
          ></el-form-item>
          <el-form-item label="活动简介">
            <Editor ref="editActInforEditor" />
          </el-form-item>
          <el-form-item label="主办方">
            <el-input v-model="editForm.activityHost"></el-input
          ></el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="editForm.activityPhone"></el-input
          ></el-form-item>
          <el-form-item label="QQ群">
            <el-input v-model="editForm.activityGroup"></el-input
          ></el-form-item>
          <el-form-item label="级别">
            <el-select v-model="editForm.activityLevel" placeholder="请选择">
              <el-option
                v-for="item in levels"
                :key="item.way"
                :label="item.way"
                :value="item.way"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="editForm.activityLink"></el-input
          ></el-form-item>
          <el-form-item label="方式">
            <el-select v-model="editForm.activityWay" placeholder="请选择">
              <el-option
                v-for="item in ways"
                :key="item.way"
                :label="item.way"
                :value="item.way"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="editForm.activityInterest" placeholder="请选择">
              <el-option
                v-for="item in ints"
                :key="item.amId"
                :label="item.amName"
                :value="item.amName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布人">
            <el-select
              v-model="editForm.activityTeacherId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teachers"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报名开始时间">
            <el-date-picker
              v-model="editForm.activityLoginstarttime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名结束时间">
            <el-date-picker
              v-model="editForm.activityLoginendtime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动开始时间">
            <el-date-picker
              v-model="editForm.activityDostarttime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动结束时间">
            <el-date-picker
              v-model="editForm.activityDoendtime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所有名额">
            <el-input v-model="editForm.allnumber"></el-input
          ></el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer">
          <el-button @click="editActDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editAct">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Editor from "../../components/Editor.vue";
export default {
  name: "ActivityInfor",
  components: { Editor },
  data() {
    return {
      actInforList: [],
      addActDialogVisible: false,
      //添加活动
      ways: [{ way: "线上" }, { way: "线下" }],
      levels: [{ way: "校内" }, { way: "校外" }],
      ints: [],
      teachers: [],
      avaFile: "",
      imageUrl: "",
      actForm: {
        activityName: "",
        activityIntro: "",
        activityHost: "",
        activityPhone: "18182317524",
        activityGroup: "1365135968",
        activityLevel: "",
        activityLink: "",
        activityWay: "",
        activityInterest: "",
        activityTeacherId: "",
        activityLoginstarttime: "",
        activityLoginendtime: "",
        activityDostarttime: "",
        activityDoendtime: "",
        allnumber: "",
      },
      //修改活动
      editActDialogVisible: false,
      editForm: {},
    };
  },
  created() {
    this.getAllInts();
    this.getAllTeachers();
    this.getAllAct();
  },
  methods: {
    async editAct() {
      this.editForm.activityIntro = this.$refs.editActInforEditor.html;
      const { data: res } = await this.$http.post(
        "activity/updateactivity",
        this.editForm
      );
      console.log("修改活动返回信息", res);
      this.editActDialogVisible = false;
      this.getAllAct();
    },
    editActDialogClosed() {
      this.editForm = {};
      this.$refs.editActInforEditor.html = "";
    },
    showActEditDialog(id) {
      console.log("活动id", id);
      for (let i of this.actInforList) {
        console.log("每次循环对象", i);
        if (i.activityId == id) {
          this.editForm = {
            activityId: i.activityId,
            activityName: i.activityName,
            activityIntro: "",
            activityHost: i.activityHost,
            activityPhone: i.activityPhone,
            activityGroup: i.activityGroup,
            activityLevel: i.activityLevel,
            activityLink: i.activityLink,
            activityWay: i.activityWay,
            activityInterest: i.activityInterest,
            activityTeacherId: i.activityTeacherId,
            activityLoginstarttime: i.activityLoginstarttime,
            activityLoginendtime: i.activityLoginendtime,
            activityDostarttime: i.activityDostarttime,
            activityDoendtime: i.activityDoendtime,
            allnumber: i.allnumber,
          };
          //定时器模拟异步操作
          setTimeout(() => {
            this.$refs.editActInforEditor.html = i.activityIntro;
          });
          this.editActDialogVisible = true;
          console.log("修改活动", this.editForm);
          return;
        }
      }
    },
    async postAct() {
      this.$refs.uploadPic.submit();
      let fd = new FormData();
      this.actForm.activityIntro = this.$refs.actInforEditor.html;
      // 将data转换为form-data
      for (let i in this.actForm) {
        fd.append(i, this.actForm[i]);
      }
      fd.append("activityPicture", this.avaFile);
      const { data: res } = await this.$http.post("activity/addactivity", fd);
      console.log("发布竞赛返回信息", res);
      this.addActDialogVisible = false;
      this.getAllAct();
    },
    httpRequest(param) {
      this.avaFile = param.file;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    async getAllTeachers() {
      const { data: res } = await this.$http.get("user/getteacher");
      this.teachers = res.data;
    },
    async getAllInts() {
      const { data: res } = await this.$http.get("activity/getactivitymanage");
      console.log("所有分类返回信息", res);
      for (let i of res.data) {
        if (i.amName == "分类") {
          this.ints = i.children;
        }
      }
      console.log("分类表格", this.ints);
    },
    addActDialogClosed() {
      this.$refs.actInforEditor.html = "";
      this.avaFile = "";
      this.imageUrl = "";
      this.actForm = {
        activityName: "",
        activityIntro: "",
        activityHost: "",
        activityPhone: "18182317524",
        activityGroup: "1365135968",
        activityLevel: "",
        activityLink: "",
        activityWay: "",
        activityInterest: "",
        activityTeacherId: "",
        activityLoginstarttime: "",
        activityLoginendtime: "",
        activityDostarttime: "",
        activityDoendtime: "",
        allnumber: "",
      };
    },
    async removeActById(id) {
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
      const { data: res } = await this.$http.post("activity/deleteactivity", {
        activityId: id,
      });
      console.log("删除活动返回信息", res);
      this.getAllAct();
    },
    stateFormat(row, column, cellValue) {
      if (!cellValue) return "";
      if (cellValue.length > 100) {
        //最长固定显示10个字符
        return cellValue.slice(0, 100) + "...";
      }
      return cellValue;
    },
    async getAllAct() {
      const { data: res } = await this.$http.get(
        "activity/getactivity?way=&level=&interest=&query="
      );
      console.log("获取返回信息", res);
      this.actInforList = res.data;
    },
  },
};
</script>

<style></style>
