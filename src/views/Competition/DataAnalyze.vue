<template>
  <div>
    <el-card>
      <el-select
        v-model="value"
        placeholder="请选择"
        style="margin: 20px"
        @change="getData"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div style="display: flex; justify-content: space-between">
        <div id="left" style="width: 50%; height: 500px"></div>
        <div id="right" style="width: 50%; height: 500px"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "DataAnalyze",
  data() {
    return {
      options: [
        {
          value: "竞赛数目分析",
          label: "竞赛数目分析",
        },
        {
          value: "参赛人数分析",
          label: "参赛人数分析",
        },
      ],
      value: "",
      //左边饼图数据
      leftData: [],
      //右边饼图数据
      rightData: [],
      //左边饼图对象
      myChart1: null,
      //右边饼图对象
      myChart2: null,
    };
  },
  mounted() {
    this.myChart1 = echarts.init(document.getElementById("left"));
    this.myChart2 = echarts.init(document.getElementById("right"));
  },
  methods: {
    async getData() {
      if (this.value == "竞赛数目分析") {
        const { data: res } = await this.$http.get(
          "statisticsdata/getcompetitiondata"
        );
        console.log("得到返回信息", res);
        this.leftData = res.data;
        this.init();
      } else if (this.value == "参赛人数分析") {
        const { data: res } = await this.$http.get(
          "statisticsdata/getpeopledata"
        );
        console.log("得到返回信息", res);
        this.leftData = res.data;
        this.init();
      }
    },
    init() {
      this.myChart1.setOption({
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          top: "10%",
          left: "center",
        },
        series: [
          {
            name:
              this.value == "竞赛数目分析" ? "竞赛数目" : "参赛人数",
            type: "pie",
            radius: ["20%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.leftData,
          },
        ],
      });
      let _this = this; // 保存指向vue实例的this指针
      this.myChart1.on("click", (params) => {
        // 点击每个图形触发的事件，params里面含有该条数据的各个属性
        _this.drawRight(params.name);
      });
    },
    drawRight(name) {
      for (let i of this.leftData) {
        if (i.name == name) {
          this.rightData = i.children;
          break;
        }
      }
      this.myChart2.setOption({
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          top: "10%",
          left: "center",
        },
        series: [
          {
            name:
              this.value == "竞赛数目分析" ? "竞赛数目" : "参赛人数",
            type: "pie",
            radius: ["30%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.rightData,
          },
        ],
      });
    },
  },
};
</script>

<style></style>
