<template>
  <div class="UserPermissions">
    <div class="handle-box">
      <el-button type="primary" icon="delete" class="handle-del mr10">批量删除</el-button>
      <el-button type="primary" style="float: right">新增</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="300"></el-table-column>
      <el-table-column prop="position" label="系统权职描述"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑权限</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑权限模态框 -->
    <el-dialog title="编辑权限" :visible.sync="dialogFormVisible" style="text-align:left" width="700px">
      <el-form :model="form" class="el-form--label-left">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="系统权职描述" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 500px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限分配" :label-width="formLabelWidth">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="[1,2,3,4,5,6,7,8,9,10,11]"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
          name: "王小虎",
          position: "web前端开发"
        },
        {
          name: "王二虎",
          position: "Java"
        },
        {
          name: "王大虎",
          position: "运营"
        },
        {
          name: "王虎",
          position: "UI"
        }
      ],
      dialogFormVisible: false,
      form: {
        name: "",
        region: ""
      },
      formLabelWidth: "120px",
      data2: [
        {
          id: 1,
          label: "赛事管理"
        },
        {
          id: 2,
          label: "项目管理"
        },
        {
          id: 3,
          label: "领队管理"
        },
        {
          id: 4,
          label: "运动员管理"
        },
        {
          id: 5,
          label: "测试组管理"
        },
        {
          id: 6,
          label: "测试直播"
        },
        {
          id: 7,
          label: "成绩分析"
        },
        {
          id: 8,
          label: "技统大数据"
        },
        {
          id: 9,
          label: "系统管理",
          children: [
            {
              id: 10,
              label: "角色权限"
            },
            {
              id: 11,
              label: "角色增加"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      // console.log(row)
      this.form.name = row.name;
      this.form.region = row.position;
    },
    handleDelete(index, row) {
      console.log(row)
    }
  }
};
</script>

<style lang="less" scoped>
.UserPermissions {
  background-color: #fff;
  padding: 30px;
  .handle-box {
    margin-bottom: 20px;
    text-align: left;
  }
}
</style>