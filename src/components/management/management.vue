<template>
  <div id="manage" style="background:#fff;padding:30px">
    <div class="handle-box">
      <span>领队姓名：</span>
      <el-input placeholder="请输入编号" v-model=" inquireName" clearable class="handle-input mr10"></el-input>
      <span style="padding-left:15px;">领队编号：</span>
      <el-input placeholder="请输入编号" v-model=" inquireSerial" clearable class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="inquire">查询</el-button>
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="allDelete">批量删除</el-button>
    </div>
    <div class="newEvent clear">
      <el-button type="primary" style="float: right;margin-left:10px" @click="newly">领队新增</el-button>
      <el-button type="primary" style="float: right" @click="educe">领队导出</el-button>
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
        <el-table-column prop="judgmentNo" label="领队编号" width="100px"></el-table-column>
        <el-table-column prop="judgmentName" label="领队姓名" width="120"></el-table-column>
        <el-table-column label="出生年月" width="120">
          <template slot-scope="scope">{{ scope.row.judgmentTime }}</template>
        </el-table-column>
        <el-table-column prop="address" label="领队简介" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="其他" show-overflow-tooltip></el-table-column>
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
      <el-dialog title="领队编辑" :visible.sync="dialogFormVisible" style="text-align:left;">
        <el-form :model="compileForm">
          <div class="compileName" style="margin-bottom:10px">
            <span style="display:inline-block;width:70px">姓名：</span>
            <el-input
              placeholder="请输入姓名"
              v-model="compileForm.judgmentName"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
          <div class="compileName" style="margin-bottom:10px">
            <span style="display:inline-block;width:70px">编号：</span>
            <el-input
              placeholder="请输入编号"
              v-model="compileForm.judgmentNo"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
          <div class="block">
            <span class="demonstration" style="display:inline-block;width:70px">出生年月：</span>
            <el-date-picker
              v-model="compileForm.judgmentTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="compileName" style="margin-top:10px">
            <span style="display:inline-block;width:70px">简介：</span>
            <el-input
              placeholder="请输入简介"
              v-model="compileForm.site"
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
      <el-dialog title="新增领队" :visible.sync="newlyFormVisible" style="text-align:left;">
        <el-form :model="newlyForm">
          <div class="newlyName" style="margin-bottom:10px">
            <span style="display:inline-block;width:70px">姓名：</span>
            <el-input
              placeholder="请输入姓名"
              v-model="newlyForm.name"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
          <div class="block">
            <span class="demonstration" style="display:inline-block;width:70px">出生年月：</span>
            <el-date-picker
              v-model="newlyForm.syncdate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="newlyName" style="margin-top:10px">
            <span style="display:inline-block;width:70px">简介：</span>
            <el-input
              placeholder="请输入简介"
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
import {
  managementInquires,
  managementNewly,
  managementDelete,
  managementCompile
} from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      //新增框的实例数据
      newlyForm: {
        name: "", //新增赛事名称
        syncdate: "", //新增日期
        site: "" //新增地点
      },
      newlyFormVisible: false,
      //编辑弹框的实例数据
      dialogFormVisible: false,
      compileForm: {
        judgmentName: "", //编辑赛事名称
        judgmentTime: "", //编辑日期
        judgmentNo: "", //编辑编号
        raceId: "" //id
      },
      formLabelWidth: "120px",
      //领队表格数据
      tableData: [
        {
          judgmentTime: "2016-05-03",
          judgmentName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          judgmentNo:8788,
          raceId: 1
        },
        {
          judgmentTime: "2016-05-02",
          judgmentName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          judgmentNo:8788,
          raceId: 2
        },
        {
          judgmentTime: "2016-05-04",
          judgmentName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          judgmentNo:8788,
          raceId: 3
        },
        {
          judgmentTime: "2016-05-01",
          judgmentName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          judgmentNo:8788,
          raceId: 4
        }
      ],
      all: [],
      deRaceId: "",
      multipleSelection: [],
      inquireSerial: "", //领队编号
      inquireName: "" //领队姓名
    };
  },
  methods: {
    //领队导出
    educe(){
      
    },
    //查询
    async inquire() {
      if (this.inquireName != "" && this.inquireSerial != "") {
        const resData = {
          judgmentName: this.inquireName,
          judgmentNo: this.inquireSerial
        };
        try {
          const res = await managementInquires(resData);
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
      this.deRaceId = row.raceId;
    },
    //确认删除
    async confirm() {
      this.dialogVisible = false;
      try {
        const res = await managementDelete(this.deRaceId);
      } catch (err) {
        console.log(err);
      }
    },
    //批量删除
    async allDelete() {
      if (this.all) {
        try {
          let res = await managementDelete(this.all);
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
        judgmentName: self.name,
        judgmentNo: self.site,
        judgmentTime: self.syncdate
      };
      try {
        const res = await managementNewly(resData);
        let o=res.tableData
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑
    async compileSync() {
      this.dialogFormVisible = false;
      self = this.compileForm;
      const resData = {
        judgmentName: self.judgmentName,
        judgmentNo: self.judgmentNo,
        raceTime: self.raceTime,
        raceId: self.raceId
      };
      try {
        const res = await managementNewly(resData);
      } catch (err) {
        console.log(err);
      }
    },
    async handleEdit(index, row) {
      this.dialogFormVisible = true;
      try {
        const res = await managementCompile(row.raceId);
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
    width: 120px;
    display: inline-block;
    padding-right: 0;
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
.el-input--suffix .el-input__inner {
  padding-right: 0;
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
