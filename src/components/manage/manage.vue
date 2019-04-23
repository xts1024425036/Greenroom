<template>
  <div id="manage" style="background:#fff;padding:30px">
    <div class="block">
      <span class="demonstration">赛事日期：</span>
      <el-date-picker
        v-model="competitionTime"
        type="datetimerange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <div class="handle-box">
      <span>赛事名称：</span>
      <el-input
        placeholder="请输入内容"
        v-model=" competitionName"
        clearable
        class="handle-input mr10"
        style="width:180px"
      ></el-input>
      <span style="padding-left:10px">赛事地点：</span>
      <el-input
        placeholder="请输入内容"
        v-model=" competitionSite"
        clearable
        class="handle-input mr10"
        style="width:170px"
      ></el-input>
      <el-button type="primary" icon="search" @click="inquire">查询</el-button>
      <el-button type="primary" style="float: right" @click="newly">新增赛事</el-button>
      <el-button
        type="primary"
        icon="delete"
        class="handle-del mr10"
        style="float: right"
        @click="educe"
      >赛事导出</el-button>
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="allDelete">批量删除</el-button>
    </div>
    <!-- 表单信息 -->
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
        <el-table-column prop="raceId" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="赛事名称" width="120"></el-table-column>
        <el-table-column label="赛事时间" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="address" label="赛事地点" show-overflow-tooltip></el-table-column>
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
          :total="500"
          @current-change="pageData"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑填写框 -->
    <div class="compile">
      <el-dialog title="赛事编辑" :visible.sync="dialogFormVisible" style="text-align:left;">
        <el-form :model="compileForm">
          <div class="compileName" style="margin-bottom:10px">
            <span style="display:inline-block;width:50px">名称：</span>
            <el-input
              placeholder="请输入名称"
              v-model="compileForm.name"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
          <div class="block">
            <span class="demonstration" style="display:inline-block;width:50px">日期：</span>
            <el-date-picker
              v-model="compileForm.syncdate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="compileName" style="margin-top:10px">
            <span style="display:inline-block;width:50px">地点：</span>
            <el-input
              placeholder="请输入地点"
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
      <el-dialog title="新增赛事" :visible.sync="newlyFormVisible" style="text-align:left;">
        <el-form :model="newlyForm">
          <div class="newlyName" style="margin-bottom:10px">
            <span style="display:inline-block;width:50px">名称：</span>
            <el-input
              placeholder="请输入名称"
              v-model="newlyForm.name"
              class="handle-input mr10"
              style="width:220px"
            ></el-input>
          </div>
          <div class="block">
            <span class="demonstration" style="display:inline-block;width:50px">日期：</span>
            <el-date-picker
              v-model="newlyForm.syncdate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="newlyName" style="margin-top:10px">
            <span style="display:inline-block;width:50px">地点：</span>
            <el-input
              placeholder="请输入地点"
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
    <div></div>
  </div>
</template>

<script>
import { inquires, deleteOpens, compileSyncs,newlySyncs } from "@/api";
export default {
  data() {
    return {
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
        name: "", //编辑赛事名称
        syncdate: "", //编辑日期
        site: "" //编辑地点
      },
      formLabelWidth: "120px",
      //运动员表格数据导出
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          raceId: 1
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          raceId: 2
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          raceId: 3
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          raceId: 4
        }
      ],
      multipleSelection: [],
      competitionName: "", //赛事名称
      competitionSite: "", //赛事地点
      competitionTime: "", //赛事时间
      deleteMark: 1,
      all: [] //批量删除的id数组
    };
  },
  mounted() {
    // this.ass()
  },
  methods: {
    //数据导出
    async educe() {
      let res = await educes();
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (res.status == 200) {
        loading.close();
        console.log(res);
      }
    },
    //查询
    async inquire() {
      if (
        (this.competitionName != "") &
        (this.competitionSite != "") &
        (this.competitionTime != "")
      ) {
        try {
          let res = await inquires(
            this.competitionName,
            this.competitionSite,
            this.competitionTime,
            this.deleteMark
          );
          if (res.status == 200) {
            this.tableData = res.data;
            console.log(res);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    //删除
    async deleteOpen(index, row) {
      try {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            const res = deleteOpens(row.raceId);
            console.log(res);
            this.$message({
              type: "info",
              message: "删除成功"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    //批量删除
    async allDelete() {
      if (this.all) {
        try {
          let res = await allDeletes(this.all);
        } catch (err) {
          console.log(err);
        }
      }
      console.log(this.all);
    },
    handleSelectionChange(val) {
      let id = [];
      val.forEach((item, index, text) => {
        id.push(item.raceId);
      });
      this.all = id;
    },
    // 分页
    pageData(index) {
      console.log(this.$router);
      console.log(index); //页码
    },
    //新增
    async newlySync() {
      this.newlyFormVisible = false;
      self = this.newlyForm;
      if ((self.name != "") & (self.syncdate != "") & (self.site != "")) {
        try {
          let res = await newlySyncs(self.name, self.syncdate, self.site);
        } catch (err) {
          console.log(err);
        }
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
    compileSync() {
      this.dialogFormVisible = false;
      self = this.compileForm;
      self.name;
      self.syncdate;
      console.log(self.site);
      self.site = "";
    },
    handleEdit(index, row) {
      self = this.compileForm;
      self.syncdate = row.date;
      self.name = row.name;
      self.site = row.address;
      this.dialogFormVisible = true;
      console.log(index, row);
    }
  }
};
</script>
<style lang="less" scoped>
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
.block {
  text-align: left;
  margin-bottom: 20px;
}
.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
