<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>竞赛管理</el-breadcrumb-item>
      <el-breadcrumb-item>竞赛信息管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="judgeDialog">添加信息</el-button>
        </el-col>
      </el-row>

      <!-- 抽象竞赛信息列表区域 -->
      <el-table
        :data="competInforList"
        border
        stripe
        v-show="curTable == '抽象竞赛信息'"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          label="竞赛名称"
          prop="absComName"
          width="100"
        ></el-table-column>
        <el-table-column
          label="竞赛简介"
          prop="absComIntroduction"
          width="100"
        ></el-table-column>
        <el-table-column
          label="主办方"
          prop="absComHost"
          width="100"
        ></el-table-column>
        <el-table-column
          label="竞赛级别"
          prop="absComLevel"
          width="80"
        ></el-table-column>
        <el-table-column
          label="学科分类"
          prop="absComsubject"
          width="80"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          prop="absComPhone"
          width="80"
        ></el-table-column>
        <el-table-column
          label="电子邮箱"
          prop="absComEmail"
          width="100"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showAbsComEditDialog(scope.row.absComId)"
              >修改
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeAbsComById(scope.row.absComId)"
            >
              删除
            </el-button>
            <!-- 查看竞赛公告 -->
            <el-button
              type="warning"
              icon="el-icon-folder"
              size="mini"
              @click="inAnInfor(scope.row.absComId)"
              >公告
            </el-button>
            <!-- 进入具体信息 -->
            <el-button
              type="success"
              icon="el-icon-crop"
              size="mini"
              @click="inSpecificInfor(scope.row.absComId)"
              >详情信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 具体竞赛信息列表 -->
      <el-table
        :data="specificInforList"
        border
        stripe
        v-show="curTable == '具体竞赛信息'"
        id="speCom"
      >
        <el-table-column type="index" width="120" align="center">
          <template slot="header">
            <el-button
              type="primary"
              size="mini"
              @click="curTable = '抽象竞赛信息'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="具体竞赛名称"
          prop="comName"
          width="100"
        ></el-table-column>
        <el-table-column
          label="创建者"
          prop="comTeacher"
          width="80"
        ></el-table-column>
        <el-table-column
          label="参赛类型"
          prop="comType"
          width="80"
        ></el-table-column>
        <el-table-column
          label="报名起始时间"
          prop="comLoginstarttime"
          width="100"
        ></el-table-column>
        <el-table-column
          label="报名截至时间"
          prop="comLoginendtime"
          width="100"
        ></el-table-column>
        <el-table-column
          label="进行起始时间"
          prop="comDostarttime"
          width="100"
        ></el-table-column>
        <el-table-column
          label="进行截至时间"
          prop="comDoendtime"
          width="100"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditComDialog(scope.row.comId)"
              >修改
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeComById(scope.row.comId)"
            >
              删除
            </el-button>
            <!-- 返回上一级 -->
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              size="mini"
              @click="inRecord(scope.row.comId, scope.row.comType)"
              >查看具体参赛记录
            </el-button>
            <!-- 查看优秀作品 -->
            <el-button
              type="primary"
              icon="el-icon-folder"
              size="mini"
              @click="inWorkList(scope.row.comId)"
              >查看优秀作品
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 竞赛公告信息列表 -->
      <el-table
        :data="announceList"
        border
        stripe
        v-show="curTable == '竞赛公告信息'"
      >
        <el-table-column type="index" width="120" align="center">
          <template slot="header">
            <el-button
              type="primary"
              size="mini"
              @click="curTable = '抽象竞赛信息'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          prop="noteTitle"
          width="200"
        ></el-table-column>
        <el-table-column
          label="正文"
          prop="distributeText"
          width="200"
        ></el-table-column>
        <el-table-column
          label="发表时间"
          prop="distributeTime"
          width="140"
        ></el-table-column>
        <el-table-column
          label="访问量"
          prop="visitCount"
          width="60"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showAnnEditDialog(scope.row.noteId)"
              >修改
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeAnnById(scope.row.noteId)"
            >
              删除
            </el-button>
            <!-- 返回上一级 -->
            <el-button
              type="warning"
              icon="el-icon-folder"
              size="mini"
              @click="searchAppdix(scope.row.noteId)"
              >查看附件
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 具体竞赛个人赛参赛信息列表 -->
      <el-table
        :data="personalParticipationRecord"
        border
        stripe
        v-show="curTable == '个人赛参赛信息列表'"
        id="personParti"
      >
        <el-table-column type="index" width="120" align="center">
          <template slot="header">
            <el-button
              type="primary"
              size="mini"
              @click="curTable = '具体竞赛信息'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="参赛学生"
          prop="stuName"
          width="70"
        ></el-table-column>
        <el-table-column
          label="报名时间"
          prop="signtime"
          width="100"
        ></el-table-column>
        <el-table-column
          label="比赛状态"
          prop="state"
          width="70"
        ></el-table-column>
        <el-table-column
          label="比赛开始时间"
          prop="starttime"
          width="100"
        ></el-table-column>
        <el-table-column
          label="比赛结束时间"
          prop="endtime"
          width="100"
        ></el-table-column>
        <el-table-column
          label="参赛作品路径"
          prop="filePath"
          width="150"
        ></el-table-column>
        <el-table-column label="评委" prop="judge" width="70"></el-table-column>
        <el-table-column
          label="比赛成绩"
          prop="grade"
          width="70"
        ></el-table-column>
        <el-table-column
          label="得奖情况"
          prop="level"
          width="70"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRecordById(scope.row.recordId)"
            >
              删除
            </el-button>
            <!-- 下载参赛作品按钮 -->
            <el-button
              type="primary"
              icon="el-icon-download"
              size="mini"
              :disabled="scope.row.state != '已完成'"
              @click="downloadPartiWorkById(scope.row.recordId)"
            >
              下载参赛作品
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 具体竞赛团队赛参赛信息列表 -->
      <el-table
        :data="teamParticipationRecord"
        border
        stripe
        v-show="curTable == '团队赛参赛信息列表'"
        id="teamParti"
      >
        <el-table-column type="index" width="120" align="center">
          <template slot="header">
            <el-button
              type="primary"
              size="mini"
              @click="curTable = '具体竞赛信息'"
              >返回上一级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="团队名称"
          prop="teamName"
          width="50"
        ></el-table-column>
        <el-table-column
          label="指导老师"
          prop="instruName"
          width="50"
        ></el-table-column>
        <el-table-column
          label="队长"
          prop="capital"
          width="50"
        ></el-table-column>
        <el-table-column
          label="队员"
          prop="stuStr"
          width="50"
        ></el-table-column>
        <el-table-column
          label="报名时间"
          prop="signtime"
          width="90"
        ></el-table-column>
        <el-table-column
          label="比赛状态"
          prop="state"
          width="60"
        ></el-table-column>
        <el-table-column
          label="开始时间"
          prop="starttime"
          width="90"
        ></el-table-column>
        <el-table-column
          label="结束时间"
          prop="endtime"
          width="90"
        ></el-table-column>
        <el-table-column
          label="参赛作品路径"
          prop="filePath"
          width="130"
        ></el-table-column>
        <el-table-column label="评委" prop="judge" width="50"></el-table-column>
        <el-table-column
          label="比赛成绩"
          prop="grade"
          width="50"
        ></el-table-column>
        <el-table-column
          label="得奖情况"
          prop="level"
          width="60"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editTeamInfor(scope.row)"
            >
              修改团队信息
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRecordById(scope.row.recordId)"
            >
              删除
            </el-button>
            <!-- 下载参赛作品按钮 -->
            <el-button
              type="primary"
              icon="el-icon-download"
              size="mini"
              :disabled="scope.row.state != '已完成'"
              @click="downloadPartiWorkById(scope.row.recordId)"
            >
              下载参赛作品
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加抽象竞赛对话框 -->
      <el-dialog
        title="添加抽象竞赛"
        :visible.sync="addAbsComDialog"
        width="30%"
        @close="addAbsComDialogClosed"
        append-to-body
      >
        <!-- 内容主体区域 -->
        <el-form :model="addAbsComForm" label-width="100px">
          <el-form-item label="竞赛名称">
            <el-input v-model="addAbsComForm.absComName"></el-input>
          </el-form-item>
          <el-form-item label="竞赛简介">
            <el-input
              type="textarea"
              v-model="addAbsComForm.absComIntroduction"
            ></el-input>
          </el-form-item>
          <el-form-item label="主办方">
            <el-input v-model="addAbsComForm.absComHost"></el-input>
          </el-form-item>
          <el-form-item label="竞赛级别">
            <el-input v-model="addAbsComForm.absComLevel"></el-input>
          </el-form-item>
          <el-form-item label="学科分类">
            <el-cascader
              v-model="subArray"
              :options="subjectList"
              :props="{
                label: 'subjectName',
                value: 'subjectId',
              }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="addAbsComForm.absComPhone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="addAbsComForm.absComEmail"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addAbsComDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAbsCom">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改抽象竞赛对话框 -->
      <el-dialog
        title="修改抽象竞赛"
        :visible.sync="editAbsComDialog"
        width="30%"
        @close="editAbsComDialogClosed"
        append-to-body
      >
        <!-- 内容主体区域 -->
        <el-form :model="editAbsComForm" label-width="100px">
          <el-form-item label="竞赛名称">
            <el-input v-model="editAbsComForm.absComName"></el-input>
          </el-form-item>
          <el-form-item label="竞赛简介">
            <el-input
              type="textarea"
              v-model="editAbsComForm.absComIntroduction"
            ></el-input>
          </el-form-item>
          <el-form-item label="主办方">
            <el-input v-model="editAbsComForm.absComHost"></el-input>
          </el-form-item>
          <el-form-item label="竞赛级别">
            <el-input v-model="editAbsComForm.absComLevel"></el-input>
          </el-form-item>
          <el-form-item label="学科分类">
            <el-cascader
              v-model="subArray"
              :options="subjectList"
              :props="{
                label: 'subjectName',
                value: 'subjectId',
              }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="editAbsComForm.absComPhone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="editAbsComForm.absComEmail"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addAbsComDialog = false">取 消</el-button>
          <el-button type="primary" @click="editAbsCom">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加竞赛公告对话框 -->
      <el-dialog
        title="添加竞赛公告"
        :visible.sync="addAnnDialog"
        width="40%"
        @close="addAnnDialogClosed"
        append-to-body
        id="ann"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addAnnForm" label-width="100px">
          <el-form-item label="标题">
            <el-input v-model="addAnnForm.noteTitle"></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <Editor ref="myEditor" />
          </el-form-item>
          <el-form-item label="文件">
            <el-upload
              class="upload-demo"
              action="#"
              multiple
              :http-request="httpRequest"
              ref="upload"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addAnnDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAnn">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改竞赛公告对话框 -->
      <el-dialog
        title="修改竞赛公告"
        :visible.sync="editAnnDialog"
        width="40%"
        @close="editAnnDialogClosed"
        append-to-body
        id="editAnn"
      >
        <!-- 内容主体区域 -->
        <el-form :model="editAnnForm" label-width="100px">
          <el-form-item label="标题">
            <el-input v-model="editAnnForm.noteTitle"></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <Editor ref="myEditEditor" />
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editAnnDialog = false">取 消</el-button>
          <el-button type="primary" @click="editAnn">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 查看附件对话框 -->
      <el-dialog
        title="查看附件"
        :visible.sync="appdixDialog"
        width="50%"
        append-to-body
        id="appdixDialog"
      >
        <el-upload
          class="upload-demo"
          action="#"
          multiple
          :http-request="httpRequest1"
          ref="upload1"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">选择添加文件</el-button>
          <el-button size="small" type="primary" @click="makeSureUpload"
            >确定上传</el-button
          >
        </el-upload>

        <!-- 附件表格信息列表 -->
        <el-table :data="appdixArray" border stripe>
          <el-table-column type="index" width="100"></el-table-column>
          <el-table-column
            label="附件名称"
            prop="appendixName"
            width="110"
          ></el-table-column>
          <el-table-column
            label="附件路径"
            prop="appendixPath"
            width="170"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button
                type="success"
                icon="el-icon-download"
                size="mini"
                @click="downloadAppdixById(scope.row.appendixId)"
                >下载附件
              </el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeAppdixById(scope.row.appendixId)"
              >
                删除附件
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="appdixDialog = false">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 添加具体竞赛对话框 -->
      <el-dialog
        title="添加具体竞赛"
        :visible.sync="addComDialog"
        width="30%"
        @close="addComDialogClosed"
        append-to-body
        id="addCom"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addComForm" label-width="100px">
          <el-form-item label="竞赛名称">
            <el-input v-model="addComForm.comName"></el-input>
          </el-form-item>
          <el-form-item label="竞赛类型">
            <el-select v-model="addComForm.comType" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建者">
            <el-select v-model="addComForm.comTeacher" placeholder="请选择">
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
              v-model="addComForm.comLoginstarttime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名结束时间">
            <el-date-picker
              v-model="addComForm.comLoginendtime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛开始时间">
            <el-date-picker
              v-model="addComForm.comDostarttime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛结束时间">
            <el-date-picker
              v-model="addComForm.comDoendtime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addComDialog = false">取 消</el-button>
          <el-button type="primary" @click="addCom">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改具体竞赛对话框 -->
      <el-dialog
        title="修改具体竞赛"
        :visible.sync="editComDialog"
        width="30%"
        @close="editComDialogClosed"
        append-to-body
        id="editCom"
      >
        <!-- 内容主体区域 -->
        <el-form :model="editComForm" label-width="100px">
          <el-form-item label="竞赛名称">
            <el-input v-model="editComForm.comName"></el-input>
          </el-form-item>
          <el-form-item label="竞赛类型">
            <el-select v-model="editComForm.comType" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建者">
            <el-select v-model="editComForm.comTeacher" placeholder="请选择">
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
              v-model="editComForm.comLoginstarttime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名结束时间">
            <el-date-picker
              v-model="editComForm.comLoginendtime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛开始时间">
            <el-date-picker
              v-model="editComForm.comDostarttime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛结束时间">
            <el-date-picker
              v-model="editComForm.comDoendtime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editComDialog = false">取 消</el-button>
          <el-button type="primary" @click="editCom">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加竞赛信息对话框 -->
      <el-dialog
        title="添加竞赛信息"
        :visible.sync="addComDialog"
        width="30%"
        @close="addComDialogClosed"
        append-to-body
        id="addCom"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addComForm" label-width="100px">
          <el-form-item label="竞赛名称">
            <el-input v-model="addComForm.comName"></el-input>
          </el-form-item>
          <el-form-item label="竞赛类型">
            <el-select v-model="addComForm.comType" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建者">
            <el-select v-model="addComForm.comTeacher" placeholder="请选择">
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
              v-model="addComForm.comLoginstarttime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名结束时间">
            <el-date-picker
              v-model="addComForm.comLoginendtime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛开始时间">
            <el-date-picker
              v-model="addComForm.comDostarttime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="比赛结束时间">
            <el-date-picker
              v-model="addComForm.comDoendtime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addComDialog = false">取 消</el-button>
          <el-button type="primary" @click="addCom">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 查看优秀作品对话框 -->
      <el-dialog
        title="查看优秀作品"
        :visible.sync="workDialog"
        width="55%"
        append-to-body
        id="workDialog"
      >
        <el-upload
          class="upload-demo"
          action="#"
          multiple
          :http-request="httpRequest2"
          ref="upload2"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary" id="leftButton"
            >选择添加文件</el-button
          >
          <el-button size="small" type="primary" @click="makeSureUpload1"
            >确定上传</el-button
          >
        </el-upload>

        <!-- 附件表格信息列表 -->
        <el-table :data="excellentWorkList" border stripe>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column
            label="作品标题"
            prop="fileName"
            width="100"
          ></el-table-column>
          <el-table-column
            label="发表时间"
            prop="fileLoadtime"
            width="140"
          ></el-table-column>
          <el-table-column
            label="文件路径"
            prop="filePath"
            width="200"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="downloadWorkById(scope.row.fileId, scope.row.filePath)"
                >下载文件
              </el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeWorkById(scope.row.fileId)"
              >
                删除文件
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="workDialog = false">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 添加个人赛参赛信息对话框 -->
      <el-dialog
        title="添加参赛记录"
        :visible.sync="addPersonalRecordDialog"
        width="30%"
        @close="addPersonalRecordDialogClosed"
        append-to-body
        id="addPersonalRecord"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addPersonalRecordForm" label-width="100px">
          <el-form-item label="参赛学生">
            <el-select
              v-model="addPersonalRecordForm.stuId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in stus"
                :key="item.stuId"
                :label="item.stuName"
                :value="item.stuId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPersonalRecordDialog = false">取 消</el-button>
          <el-button type="primary" @click="addPersonalRecord">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加团队赛参赛信息对话框 -->
      <el-dialog
        title="添加参赛记录"
        :visible.sync="addTeamRecordDialog"
        width="30%"
        @close="addTeamRecordDialogClosed"
        append-to-body
      >
        <!-- 内容主体区域 -->
        <el-form :model="addTeamRecordForm" label-width="100px">
          <el-form-item label="团队名字">
            <el-input v-model="addTeamRecordForm.teamName"></el-input>
          </el-form-item>
          <el-form-item label="指导老师">
            <el-select
              v-model="addTeamRecordForm.instrArray"
              multiple
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
          <el-form-item label="队长">
            <el-select
              v-model="addTeamRecordForm.captialId"
              placeholder="请选择"
              @change="chooseCap"
            >
              <el-option
                v-for="item in stus"
                :key="item.stuId"
                :label="item.stuName"
                :value="item.stuId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="队员">
            <el-select
              v-model="addTeamRecordForm.stuArray"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in stus"
                :key="item.stuId"
                :label="item.stuName"
                :value="item.stuId"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addTeamRecordDialog = false">取 消</el-button>
          <el-button type="primary" @click="addTeamRecord">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改团队信息对话框 -->
      <el-dialog
        title="修改团队信息"
        :visible.sync="editTeamDialog"
        width="30%"
        @close="editTeamDialogClosed"
        append-to-body
        id="editAnn"
      >
        <!-- 内容主体区域 -->
        <el-form :model="editTeamForm" label-width="100px">
          <el-form-item label="团队名字">
            <el-input v-model="editTeamForm.teamName"></el-input>
          </el-form-item>
          <el-form-item label="指导老师">
            <el-select
              v-model="editTeamForm.instrArray"
              multiple
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
          <el-form-item label="队长">
            <el-select
              v-model="editTeamForm.captialId"
              placeholder="请选择"
              @change="editChooseCap"
            >
              <el-option
                v-for="item in stus"
                :key="item.stuId"
                :label="item.stuName"
                :value="item.stuId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="队员">
            <el-select
              v-model="editTeamForm.stuArray"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in stus"
                :key="item.stuId"
                :label="item.stuName"
                :value="item.stuId"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editTeamDialog = false">取 消</el-button>
          <el-button type="primary" @click="editTeam">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Editor from "../../components/Editor.vue";
export default {
  name: "CompetInfor",
  components: { Editor },
  data() {
    return {
      //文件列表
      fileList: [],
      //抽象竞赛信息列表
      competInforList: [],
      //具体竞赛信息列表
      specificInforList: [],
      //竞赛公告列表
      announceList: [],
      //优秀作品列表
      excellentWorkList: [],
      //个人赛参赛记录列表
      personalParticipationRecord: [],
      //团队赛参赛记录列表
      teamParticipationRecord: [],
      //可选择的学科列表
      subjectList: [],
      //性质，学科数组
      subArray: [],
      //附件数组
      appdixArray: [],
      //比赛类型
      types: [
        { label: "个人赛", value: "个人赛" },
        { label: "团队赛", value: "团队赛" },
      ],
      //所有老师
      teachers: [],
      //所有学生
      stus: [],
      //当前表格类型 "抽象竞赛信息" "具体竞赛信息" "竞赛公告信息" "参赛信息列表" "优秀作品列表"
      curTable: "抽象竞赛信息",
      //当前具体竞赛信息所属抽象竞赛Id
      absComId: "",
      //当前参赛记录或优秀作品所属具体竞赛Id
      comId: "",
      //当前操作竞赛类型 "个人赛"/"团队赛"
      comType: "",
      //当前附件操作所属公告id
      noteId: "",
      //添加对话框开关
      addAbsComDialog: false,
      addComDialog: false,
      addAnnDialog: false,
      addPersonalRecordDialog: false,
      addTeamRecordDialog: false,
      addWorkDialog: false,
      //修改对话框开关
      editAbsComDialog: false,
      editComDialog: false,
      editAnnDialog: false,
      editPersonalRecordDialog: false,
      editTeamRecordDialog: false,
      editWorkDialog: false,
      editTeamDialog: false,
      //查看附件对话框
      appdixDialog: false,
      //查看优秀作品对话框
      workDialog: false,
      //添加抽象竞赛对话框表单
      addAbsComForm: {
        absComName: "",
        absComIntroduction: "",
        absComHost: "",
        absComPhone: "",
        absComEmail: "",
        absComLevel: "",
        absComsubjectId: "",
      },
      //修改抽象竞赛对话框表单
      editAbsComForm: {
        absComName: "",
        absComIntroduction: "",
        absComHost: "",
        absComPhone: "",
        absComEmail: "",
        absComLevel: "",
        absComsubjectId: "",
      },
      //添加竞赛公告对话框表单
      addAnnForm: {
        noteTitle: "",
      },
      //添加附件对象
      addAppdix: {},
      //修改公告对话框
      editAnnForm: {
        noteTitle: "",
      },
      //上传优秀作品
      exWork: {},
      //添加具体竞赛表单
      addComForm: {
        comName: "",
        comType: "",
        comTeacher: "",
        comLoginstarttime: "",
        comLoginendtime: "",
        comDostarttime: "",
        comDoendtime: "",
      },
      editComForm: {
        comId: "",
        comName: "",
        comType: "",
        comTeacher: "",
        comLoginstarttime: "",
        comLoginendtime: "",
        comDostarttime: "",
        comDoendtime: "",
      },
      addPersonalRecordForm: {
        stuId: "",
      },
      addTeamRecordForm: {
        teamName: "",
        instrArray: [],
        captialId: "",
        stuArray: [],
      },
      editTeamForm: {
        teamName: "",
        instrArray: [],
        captialId: "",
        stuArray: [],
      },
    };
  },
  created() {
    //获取抽象竞赛列表
    this.getCompetInforList();
    //获取可选择的学科列表
    this.getSubList();
    //获取所有老师选择
    this.getAllTeachers();
    //获取所有学生
    this.getAllStus();
  },
  methods: {
    //修改团队信息对话框关闭
    editTeamDialogClosed() {
      this.editTeamForm = {
        teamName: "",
        instrArray: [],
        captialId: "",
        stuArray: [],
      };
    },
    //修改团队信息
    editTeamInfor(infor) {
      this.editTeamForm = {
        recordId: infor.recordId,
        teamName: infor.teamName,
        instrArray: infor.instruId,
        captialId: infor.capitalId,
        stuArray: infor.mateId,
      };
      this.editTeamDialog = true;
    },
    //提交修改团队信息
    async editTeam() {
      const { data: res } = await this.$http.post(
        "competition/updaterecord",
        this.editTeamForm
      );
      this.editTeamDialog = false;
      this.inRecord(this.comId, this.comType);
    },
    //添加团队赛参赛记录
    async addTeamRecord() {
      const { data: res } = await this.$http.post("competition/addrecord", {
        comId: this.comId,
        captialId: this.addTeamRecordForm.captialId,
        teamName: this.addTeamRecordForm.teamName,
        instrArray: this.addTeamRecordForm.instrArray,
        stuArray: this.addTeamRecordForm.stuArray,
      });
      this.addTeamRecordDialog = false;
      this.inRecord(this.comId, this.comType);
    },
    //添加选择器改变触发事件
    chooseCap() {
      for (let stu of this.stus) {
        if (stu.stuId == this.addTeamRecordForm.captialId) {
          stu.disabled = true;
        } else {
          stu.disabled = false;
        }
      }
    },
    //修改选择器改变触发事件
    editChooseCap() {
      for (let stu of this.stus) {
        if (stu.stuId == this.editTeamForm.captialId) {
          stu.disabled = true;
        } else {
          stu.disabled = false;
        }
      }
      if (this.editTeamForm.stuArray.includes(this.editTeamForm.captialId))
        this.editTeamForm.stuArray = [];
    },
    //添加团队参赛记录对话框关闭
    addTeamRecordDialogClosed() {
      this.addTeamRecordForm = {};
    },
    //获取所有学生
    async getAllStus() {
      const { data: res } = await this.$http.get("user/getstudent");
      this.stus = res.data;
    },
    //删除个人参赛记录
    async removePersonalRecordById(id) {
      const { data: res } = await this.$http.post("competition/deleterecord", {
        recordId: id,
      });
      this.inRecord(this.comId, this.type);
    },
    //关闭添加个人赛参赛记录
    addPersonalRecordDialogClosed() {
      this.addPersonalRecordForm = {
        stuId: "",
      };
    },
    //提交个人赛添加
    async addPersonalRecord() {
      const { data: res } = await this.$http.post("competition/addrecord", {
        comId: this.comId,
        captialId: this.addPersonalRecordForm.stuId,
        teamName: "",
        instrArray: "",
        stuArray: "",
      });
      this.addPersonalRecordDialog = false;
      this.inRecord(this.comId, this.comType);
    },
    //获取所有老师
    async getAllTeachers() {
      const { data: res } = await this.$http.get("user/getteacher");
      this.teachers = res.data;
    },
    //文件上传自定义方法
    httpRequest(param) {
      this.addAnnForm.file = param.file;
    },
    //文件上传自定义1
    httpRequest1(param) {
      this.addAppdix.file = param.file;
    },
    httpRequest2(param) {
      this.exWork.file = param.file;
    },
    //确认上传文件
    async makeSureUpload() {
      this.$refs.upload1.submit();
      let fd = new FormData();
      // 将data转换为form-data
      for (let i in this.addAppdix) {
        fd.append(i, this.addAppdix[i]);
      }
      fd.append("noteId", this.noteId);

      const { data: res } = await this.$http.post("note/addappendix", fd);
      //更新列表
      this.inAnInfor(this.absComId);
    },
    async makeSureUpload1() {
      this.$refs.upload2.submit();
      let fd = new FormData();
      // 将data转换为form-data
      for (let i in this.exWork) {
        fd.append(i, this.exWork[i]);
      }
      fd.append("comId", this.comId);

      const { data: res } = await this.$http.post("competition/uploaditem", fd);
      //更新列表
      this.inWorkList(this.comId);
    },
    //取级联选择器最后一个数字
    handleChange(value) {
      if (this.addAbsComDialog) this.addAbsComForm.absComsubjectId = value[1];
      else if (this.editAbsComDialog)
        this.editAbsComForm.absComsubjectId = value[1];
    },
    //将当前表格与对话框状态链接起来
    judgeDialog() {
      switch (this.curTable) {
        case "抽象竞赛信息":
          this.addAbsComDialog = true;
          break;
        case "具体竞赛信息":
          this.addComDialog = true;
          break;
        case "竞赛公告信息":
          this.addAnnDialog = true;
          break;
        case "个人赛参赛信息列表":
          this.addPersonalRecordDialog = true;
          break;
        case "团队赛参赛信息列表":
          this.addTeamRecordDialog = true;
          break;
        case "优秀作品信息":
          this.addWorkDialog = true;
          break;
      }
    },
    //查看抽象竞赛列表
    async getCompetInforList() {
      const { data: res } = await this.$http.get(
        "competition/getcompetitionmeta"
      );
      this.competInforList = res.data;
    },
    //获取可选择的学科列表
    async getSubList() {
      const { data: res } = await this.$http.get("subject/getsubject");
      let dataList = res.data;
      dataList.map((item) => {
        let obj = {
          subjectId: item.natureId,
          subjectName: item.natureName,
          children: item.children,
        };
        this.subjectList.push(obj);
      });
    },
    //查看竞赛公告列表
    async inAnInfor(id) {
      const { data: res } = await this.$http.get("note/getnote?absComId=" + id);
      this.announceList = res.data;
      if (this.noteId) {
        for (let note of this.announceList) {
          if (note.noteId == this.noteId) {
            this.appdixArray = note.appendix;
            return;
          }
        }
      }
      this.absComId = id;
      this.curTable = "竞赛公告信息";
    },
    //查看具体竞赛信息列表
    async inSpecificInfor(id) {
      const { data: res } = await this.$http.get(
        "competition/getcompetition?absComId=" + id
      );
      this.absComId = id;
      this.specificInforList = res.data;
      this.curTable = "具体竞赛信息";
    },
    //查看具体参赛记录信息
    async inRecord(id, type) {
      const { data: res } = await this.$http.get(
        "competition/getrecord?comId=" + id
      );
      this.comId = id;
      this.comType = type;
      switch (type) {
        case "个人赛":
          this.curTable = "个人赛参赛信息列表";
          this.personalParticipationRecord = res.data;
          break;
        case "团队赛":
          this.curTable = "团队赛参赛信息列表";
          this.teamParticipationRecord = res.data;
          break;
      }
    },
    //查看优秀作品列表
    async inWorkList(id) {
      const { data: res } = await this.$http.get(
        "competition/getiteminfo?comId=" + id
      );
      this.comId = id;
      this.excellentWorkList = res.data;
      this.workDialog = true;
    },
    //删除抽象竞赛信息
    async removeAbsComById(id) {
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
        "competition/deletecompetitionmeta",
        { absComId: id }
      );
      this.getCompetInforList();
    },
    //删除具体竞赛信息
    async removeComById(id) {
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
        "competition/deletecompetition",
        { comId: id }
      );
      //重新获取具体竞赛信息
      this.inSpecificInfor(this.absComId);
    },
    //删除公告信息
    async removeAnnById(id) {
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
      const { data: res } = await this.$http.post("note/deletenote", {
        noteId: id,
      });
      this.inAnInfor(this.absComId);
    },
    //删除具体参赛记录
    async removeRecordById(id) {
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
      const { data: res } = await this.$http.post("competition/deleterecord", {
        recordId: id,
      });
      this.inRecord(this.comId, this.comType);
    },
    //删除优秀作品
    async removeFileById(id) {
      const { data: res } = await this.$http.post("competition/deleteitem", {
        fileId: id,
      });
      this.inWorkList(this.comId);
    },
    //添加抽象竞赛
    async addAbsCom() {
      const { data: res } = await this.$http.post(
        "competition/addcompetitionmeta",
        this.addAbsComForm
      );
      this.addAbsComDialog = false;
      this.getCompetInforList();
    },
    //添加抽象竞赛对话框关闭
    addAbsComDialogClosed() {
      this.subArray = [];
      this.addAbsComForm = {
        absComName: "",
        absComIntroduction: "",
        absComHost: "",
        absComPhone: "",
        absComEmail: "",
        absComLevel: "",
        absComsubjectId: "",
      };
    },
    //修改抽象竞赛对话框关闭
    editAbsComDialogClosed() {
      this.editAbsComForm = {
        absComName: "",
        absComIntroduction: "",
        absComHost: "",
        absComPhone: "",
        absComEmail: "",
        absComLevel: "",
        absComsubjectId: "",
      };
    },
    //展示抽象修改对话框
    showAbsComEditDialog(id) {
      for (let absCom of this.competInforList) {
        if (absCom.absComId == id) {
          this.subArray = absCom.absComsubjectId;
          this.editAbsComForm = {
            absComId: id,
            absComName: absCom.absComName,
            absComIntroduction: absCom.absComIntroduction,
            absComHost: absCom.absComHost,
            absComPhone: absCom.absComPhone,
            absComEmail: absCom.absComEmail,
            absComLevel: absCom.absComLevel,
            absComsubjectId: this.subArray[1],
          };
          this.editAbsComDialog = true;
          return;
        }
      }
    },
    //提交修改抽象竞赛
    async editAbsCom() {
      const { data: res } = await this.$http.post(
        "competition/updatecompetitionmeta",
        this.editAbsComForm
      );
      this.editAbsComDialog = false;
      this.getCompetInforList();
    },
    //添加竞赛公告对话框关闭
    addAnnDialogClosed() {
      this.$refs.myEditor.html = "";
      this.addAnnForm = {
        noteTitle: "",
      };
    },
    //添加竞赛公告
    async addAnn() {
      this.$refs.upload.submit();
      let fd = new FormData();
      // 将data转换为form-data
      for (let i in this.addAnnForm) {
        fd.append(i, this.addAnnForm[i]);
      }
      fd.append("absComId", this.absComId);
      fd.append("distributeText", this.$refs.myEditor.html);

      const { data: res } = await this.$http.post("note/addnote", fd);

      this.addAnnDialog = false;
      this.inAnInfor(this.absComId);
    },
    //根据附件id下载附件
    downloadAppdixById(id) {
      var download = document.createElement("a");
      download.setAttribute(
        "href",
        "https://4wr6987968.yicp.fun/note/downloadappendix?appendixId=" + id
      );
      download.click();
    },
    //展示某个公告的附件列表
    searchAppdix(id) {
      for (let ann of this.announceList) {
        if (ann.noteId == id) {
          this.appdixArray = ann.appendix;
        }
        this.noteId = id;
        this.appdixDialog = true;
        return;
      }
    },
    //删除某个附件且同步附件表格
    async removeAppdixById(id) {
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
      const { data: res } = await this.$http.post("note/deleteappendix", {
        appendixId: id,
      });
      this.inAnInfor(this.absComId);
    },
    //打开修改公告对话框
    showAnnEditDialog(id) {
      for (let note of this.announceList) {
        if (note.noteId == id) {
          this.editAnnForm = {
            noteId: id,
            noteTitle: note.noteTitle,
          };
          //定时器模拟异步操作
          setTimeout(() => {
            this.$refs.myEditEditor.html = note.distributeText;
          });
          this.editAnnDialog = true;
          return;
        }
      }
    },
    //修改对话框关闭
    editAnnDialogClosed() {
      this.$refs.myEditEditor.html = "";
      this.editAnnForm = {
        noteTitle: "",
      };
    },
    //提交修改公告
    async editAnn() {
      const { data: res } = await this.$http.post("note/updatenote", {
        noteId: this.editAnnForm.noteId,
        noteTitle: this.editAnnForm.noteTitle,
        distributeText: this.$refs.myEditEditor.html,
      });
      this.editAnnDialog = false;
      this.inAnInfor(this.absComId);
    },
    //添加具体竞赛对话框关闭
    addComDialogClosed() {
      this.addComForm = {
        comName: "",
        comType: "",
        comTeacher: "",
        comLoginstarttime: "",
        comLoginendtime: "",
        comDostarttime: "",
        comDoendtime: "",
      };
    },
    //添加具体竞赛
    async addCom() {
      const { data: res } = await this.$http.post(
        "competition/addcompetition",
        {
          absComId: this.absComId,
          comName: this.addComForm.comName,
          comType: this.addComForm.comType,
          comTeacher: this.addComForm.comTeacher,
          comLoginstarttime: this.addComForm.comLoginstarttime,
          comLoginendtime: this.addComForm.comLoginendtime,
          comDostarttime: this.addComForm.comDostarttime,
          comDoendtime: this.addComForm.comDoendtime,
        }
      );
      this.addComDialog = false;
      this.inSpecificInfor(this.absComId);
    },
    //修改具体竞赛对话框关闭
    editComDialogClosed() {
      this.editComForm = {
        comId: "",
        comName: "",
        comType: "",
        comTeacher: "",
        comLoginstarttime: "",
        comLoginendtime: "",
        comDostarttime: "",
        comDoendtime: "",
      };
    },
    //展示修改对话框
    showEditComDialog(id) {
      for (let com of this.specificInforList) {
        if (com.comId == id) {
          this.editComForm = {
            comId: id,
            comName: com.comName,
            comType: com.comType,
            comTeacher: com.comTeacherId,
            comLoginstarttime: com.comLoginstarttime,
            comLoginendtime: com.comLoginendtime,
            comDostarttime: com.comDostarttime,
            comDoendtime: com.comDoendtime,
          };
          console.log("修改表单",this.editComForm)
          console.log("具体竞赛信息",com)
          this.editComDialog = true;
          return;
        }
      }
    },
    //提交修改具体竞赛
    async editCom() {
      const { data: res } = await this.$http.post(
        "competition/updatecompetition",
        this.editComForm
      );
      this.inSpecificInfor(this.absComId);
      this.editComDialog = false;
    },
    //下载优秀作品
    downloadWorkById(id) {
      var download = document.createElement("a");
      download.setAttribute(
        "href",
        "https://4wr6987968.yicp.fun/competition/downloaditem?fileId=" + id
      );
      download.click();
    },
    //下载参赛作品
    downloadPartiWorkById(id) {
      var download = document.createElement("a");
      download.setAttribute(
        "href",
        "https://4wr6987968.yicp.fun/competition/downloadrecord?recordId=" + id
      );
      download.click();
    },
    //删除优秀作品并同步表格
    async removeWorkById(id) {
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
      const { data: res } = await this.$http.post("competition/deleteitem", {
        fileId: id,
      });
      this.inWorkList(this.comId);
    },
  },
};
</script>

<style>
#ann .el-dialog__body {
  padding: 5px 40px 0 0;
}
#ann .el-form-item {
  margin-bottom: 5px;
}
#editAnn .el-dialog__body {
  padding: 5px 40px 5px 0;
}
#editAnn .el-form-item {
  margin-bottom: 5px;
}
#appdixDialog .upload-demo {
  margin-bottom: 15px;
}
#appdixDialog .el-dialog__body {
  padding: 15px;
}
#speCom .el-button {
  margin: 5px;
}
#editCom .el-dialog__body {
  padding: 15px 15px 0 15px;
}
#editCom .el-dialog__footer {
  padding-bottom: 10px;
}
#addCom .el-dialog__body {
  padding: 30px;
}
#workDialog .upload-demo {
  margin-bottom: 15px;
}
#workDialog .el-dialog__body {
  padding: 30px;
}
#leftButton {
  margin-right: 10px;
}
#personParti .el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}
#teamParti .el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}
</style>
