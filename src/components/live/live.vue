<template>
  <div class="live">
    <div class="handle-box">
      <span>赛事名称：</span>
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search" class="handle-input" v-model="value1"></el-input>
      <span>赛事日期：</span>
      <el-date-picker
        unlink-panels
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" icon="search">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="team" label="赛事名称" width="180"></el-table-column>
      <el-table-column prop="name" label="赛事时间" width="400"></el-table-column>
      <el-table-column prop="number" label="赛事地点"></el-table-column>
      <el-table-column prop="number" label="赛事状态" width="180"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          team: "山东体育学院",
          name: "王小虎",
          number: "097"
        },
        {
          team: "山西体育学院",
          name: "王小虎",
          number: "099"
        },
        {
          team: "西安体育学院",
          name: "王小虎",
          number: "101"
        },
        {
          team: "山东体育学院",
          name: "王小虎",
          number: "103"
        },
        {
          team: "山东体育学院",
          name: "王小虎",
          number: "103"
        },
        {
          team: "山东体育学院",
          name: "王小虎",
          number: "103"
        },
        {
          team: "山东体育学院",
          name: "王小虎",
          number: "103"
        },
        {
          team: "山东体育学院",
          name: "王小虎",
          number: "103"
        }
      ],
      value1: '',
      value: ''
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less" scoped>
.live {
  background-color: #fff;
  padding: 30px;
  .handle-box {
    margin-bottom: 20px;
    text-align: left;
    .el-select {
      margin-right: 20px;
    }
    span {
      font-size: 14px;
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