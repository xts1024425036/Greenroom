<template>
  <div class="table">
    <div class="handle-box">
      <div class="select">
        <span>赛事：</span>
        <el-select v-model="team" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <span>项目：</span>
        <el-select v-model="project" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </div>
      <el-button type="primary" icon="delete" class="handle-del mr10">批量删除</el-button>
      <span>领队：</span>
      <el-input placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <span>运动员：</span>
      <el-input placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-button type="primary" style="float: right" @click="dialogFormVisible = true">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="team" label="赛事名称" width="180"></el-table-column>
      <el-table-column prop="project" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="loader" label="领队" width="180"></el-table-column>
      <el-table-column prop="athletes" label="运动员信息"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="1"
        layout="prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>

    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible" style="text-align:left">
      <el-form :model="form" class="el-form--label-left">
        <el-form-item label="赛事名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="领队" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="运动员信息" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 500px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-button type="primary" @click="innerVisible = true">搜选</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="收货地址" :visible.sync="innerVisible" append-to-body>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>


    <!-- <el-dialog title="外层 Dialog" :visible.sync="dialogFormVisible">
      <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body></el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog> -->

    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisibles" style="text-align:left" width="500px">
      <el-form :model="form" class="el-form--label-left">
        <el-form-item label="赛事名称" :label-width="formLabelWidth">
          <el-input v-model="list.team" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="list.project" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="领队" :label-width="formLabelWidth">
          <el-input v-model="list.loader" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="运动员信息" :label-width="formLabelWidth">
          <el-input v-model="list.athletes" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibles = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          team: "2016-05-02",
          project: "王小虎",
          loader: "上海市普陀区金沙江路 1518 弄",
          athletes: "上海市普陀区金沙江路 1518 弄"
        },
        {
          team: "2016-05-02",
          project: "王小虎",
          loader: "上海市普陀区金沙江路 1518 弄",
          athletes: "上海市普陀区金沙江路 1518 弄"
        },
        {
          team: "2016-05-02",
          project: "王小虎",
          loader: "上海市普陀区金沙江路 1518 弄",
          athletes: "上海市普陀区金沙江路 1518 弄"
        },
        {
          team: "2016-05-02",
          project: "王小虎",
          loader: "上海市普陀区金沙江路 1518 弄",
          athletes: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      team: "",
      project: "",
      dialogFormVisible: false,
      dialogFormVisibles: false,
      innerVisible: false,
      form: {
        name: "",
        region: ""
      },
      list: {
        team: "",
        project: "",
        loader: "",
        athletes: ""
      },
      formLabelWidth: "120px",
      multipleSelection: []
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisibles = true;
      this.list.team = row.team;
      this.list.project = row.project;
      this.list.loader = row.loader;
      this.list.athletes = row.athletes;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  background-color: #fff;
  padding: 30px;
  .handle-box {
    margin-bottom: 20px;
    text-align: left;
    .select {
      margin-bottom: 20px;
      span {
        font-size: 14px;
      }
      .el-select {
        margin-right: 20px;
      }
    }
    span {
      font-size: 14px;
    }
    .handle-del {
      margin-right: 20px;
    }
    .handle-input {
      width: 150px;
      display: inline-block;
      margin-right: 20px;
    }
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
