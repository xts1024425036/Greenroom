<template>
  <div id="manage" style="background:#fff;padding:30px">
    <div class="handle-box">
      <span>项目名称：</span>
      <el-select v-model="projecName" clearable placeholder="请选择项目名称">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="inquires">查询</el-button>
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="incrment">批量删除{{alld}}</el-button>
    </div>
    <div class="newEvent clear">
      <el-button type="primary" style="float: right;margin-left:10px" @click="newly">新增项目</el-button>
      <el-button type="primary" style="float: right" @click="educe">项目导出</el-button>
    </div>
    <div class="tableData">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55px" align="center"></el-table-column>
        <el-table-column prop="projectNo" label="编号" width="60" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="projectTime" label="项目日期" width="120"></el-table-column>
        <el-table-column prop="address" label="项目简介" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteOpen(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          @current-change="pageData"
        ></el-pagination>
      </div>
    </div>
    <!-- 删除提示 -->
    <div class="hint">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确认删除此信息吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑填写框 -->
    <div class="compile">
      <el-dialog title="项目编辑" :visible.sync="dialogFormVisible" style="text-align:left;">
        <el-form :model="compileForm">
          <div class="compileName" style="margin-bottom:10px">
            <span style="display:inline-block;width:70px">项目名称：</span>
            <el-input
              placeholder="请输入项目名称"
              v-model="compileForm.projectName"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
          <div class="block">
            <span class="demonstration" style="display:inline-block;width:70px">项目时间：</span>
            <el-date-picker
              v-model="compileForm.syncdate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="compileName" style="margin-top:10px">
            <span>项目编号：</span>
            <el-input
              placeholder="请输入项目编号"
              v-model="compileForm.projectNo"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="compileSync">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增填写框 -->
    <div class="newly">
      <el-dialog title="新增项目" :visible.sync="newlyFormVisible" style="text-align:left;">
        <el-form :model="newlyForm">
          <div class="newlyName" style="margin-bottom:10px">
            <span style="display:inline-block;width:70px">项目名称：</span>
            <el-input
              placeholder="请输入项目名称"
              v-model="newlyForm.name"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
          <div class="block">
            <span class="demonstration" style="display:inline-block;width:70px">项目时间：</span>
            <el-date-picker
              v-model="newlyForm.projectTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="newlyName" style="margin-top:10px">
            <span style="display:inline-block;width:70px">项目地点：</span>
            <el-input
              placeholder="请输入项目地点"
              v-model="newlyForm.site"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newlyFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="newlySync">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {
  projectInquires,
  projectNewly,
  projectDelete,
  projectCompile
} from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      //新增框的实例数据
      newlyForm: {
        name: "", //新增赛事名称
        syncdate: "", //新增日期
        site: "" //新增编号
      },
      newlyFormVisible: false,
      //编辑弹框的实例数据
      dialogFormVisible: false,
      compileForm: {
        projectName: "", //编辑赛事名称
        projectTime: "", //编辑日期
        projectNo: "" //编号
      },
      formLabelWidth: "120px",
      //运动员表格数据
      tableData: [
        {
          projectTime: "2016-05-03",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          projectNo: 6666,
          raceId: 1
        },
        {
          projectTime: "2016-05-03",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          projectNo: 7777,
          raceId: 2
        },
        {
          projectTime: "2016-05-03",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1515 弄",
          projectNo: 8888,
          raceId: 3
        },
        {
          projectTime: "2016-05-03",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1514 弄",
          projectNo: 9999,
          raceId: 4
        }
      ],
      //项目名称
      options: [
        {
          value: "选项1",
          label: "全场3/4场加速跑"
        },
        {
          value: "选项2",
          label: "7步后退投篮"
        },
        {
          value: "选项3",
          label: "1分钟双摇跳绳"
        },
        {
          value: "选项4",
          label: "六边形移动"
        },
        {
          value: "选项5",
          label: "1分钟仰卧起坐"
        },
        {
          value: "选项6",
          label: "全场综合传接球"
        },
        {
          value: "选项7",
          label: "15m × 17折反跑"
        },
        {
          value: "选项8",
          label: "全场综合运球上篮"
        },
        {
          value: "选项9",
          label: "立定跳远"
        },
        {
          value: "选项10",
          label: "助跑单脚起跳摸高"
        }
      ],
      all: [],//批量删除的id
      deRaceId: "",//单个删除的id
      projecName: "",
      multipleSelection: [],
      inquire: ""
    };
  },
  computed:{
...mapGetters(['alld']),
  },
  methods: {
    
    ...mapActions(['incrment']),
    //项目导出
    educe(){

    },
    //查询
    async inquires() {
      if (this.projecName != "") {
        try {
          console.log(this.projecName);
          const res = await projectInquires(this.projecName);
          if (res.status == 200) {
            this.tableData = res.data;
            console.log(res);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 分页
    pageData(index) {
      console.log(index); //页码
    },
    //删除
    deleteOpen(index, row) {
      this.dialogVisible = true;
      this.deRaceId = row.projectId;
    },
    //确认删除
    async confirm() {
      this.dialogVisible = false;
      try {
        const res = await projectDelete(this.deRaceId);
      } catch (err) {
        console.log(err);
      }
    },
    //批量删除
    async allDelete() {
      if (this.all) {
        try {
          let res = await projectDelete(this.all);
        } catch (err) {
          console.log(err);
        }
      }
      console.log(this.all);
    },
    //被勾选的数据(批量删除)
    handleSelectionChange(val) {
      let id = [];
      val.forEach((item, index, text) => {
        id.push(item.raceId);
      });
      this.all = id;
    },
    //新增
    async newlySync() {
      this.newlyFormVisible = false;
      self = this.newlyForm;
      const resData = {
        projectName: self.name,
        projectNo: self.site,
        projectTime: self.syncdate
      };
      try {
        const res = await projectNewly(resData);
      } catch (err) {
        console.log(err);
      }
    },
    newly() {
      this.newlyFormVisible = true;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //编辑
    async compileSync() {
      var self = this.compileForm;
      const resData = {
        raceName: self.raceName,
        location: self.location,
        raceTime: self.raceTime,
        raceId: self.raceId
      };
      try {
        const res = await projectNewly(resData);
      } catch (err) {
        console.log(err);
      }
      this.dialogFormVisible = false;
    },
    async handleEdit(index, row) {
      this.dialogFormVisible = true;
      try {
        const res = await projectCompile(row.raceId);
        this.compileForm = res.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="less" scoped>
//清除浮动
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.handle-box {
  margin-bottom: 20px;
  text-align: left;
  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
.newEvent {
  margin-bottom: 20px;
}
.pagination {
  text-align: right;
  margin-top: 20px;
}
.el-dialog__header {
  text-align: left;
}
</style>
