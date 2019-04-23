<template>
  <div class="results">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="date" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="name" label="赛事"></el-table-column>
      <el-table-column prop="name" label="领队"></el-table-column>
      <el-table-column prop="address" label="跳绳"></el-table-column>
      <el-table-column prop="address" label="仰卧起坐"></el-table-column>
      <el-table-column prop="address" label="加速跑"></el-table-column>
      <el-table-column prop="address" label="折返跑"></el-table-column>
      <el-table-column prop="address" label="摸高"></el-table-column>
      <el-table-column prop="address" label="投篮"></el-table-column>
      <el-table-column prop="address" label="六边移动"></el-table-column>
      <el-table-column prop="address" label="折返跑"></el-table-column>
      <el-table-column prop="address" label="传接球"></el-table-column>
      <el-table-column prop="address" label="上篮"></el-table-column>
      <el-table-column prop="address" label="跳远"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.results {
  background-color: #fff;
  padding: 30px;
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>