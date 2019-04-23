<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="system-title">篮球大数据分析系统</div>
        <div class="system-right">
          <img src="../styles/img.jpg" alt>
          <span class="welcome" style="margin-left: 10px; color: #fff">admin</span>
          <el-button type="danger" icon="iconfont icon-tuichu" circle style="margin: 0 40px 0 40px" @click="edit"></el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu unique-opened router :default-active="onRoutes">
              <el-menu-item index="manage">赛事管理</el-menu-item>
              <el-menu-item index="project">项目管理</el-menu-item>
              <el-menu-item index="management">领队管理</el-menu-item>
              <el-menu-item index="athlete">运动员管理</el-menu-item>
              <el-menu-item index="test">测试组管理</el-menu-item>
              <el-menu-item index="live">测试直播</el-menu-item>
              <el-menu-item index="results">成绩分析</el-menu-item>
              <el-menu-item index="statistical">技统大数据</el-menu-item>
            <el-submenu index="9">
              <template slot="title">系统管理</template>
              <el-menu-item index="userPermissions">角色权限</el-menu-item>
              <el-menu-item index="usersIncrease">角色增加</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="b">
            <v-tags></v-tags>
          </div>
          <div class="content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import vTags from "./Tags.vue";
export default {
  data() {
    return {};
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    edit() {
      sessionStorage.removeItem('uname');
      this.$router.push('/login')
    }
  },
  components: {
    vTags
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.el-header {
  background-color: #409eff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .system-title {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
  }
  .system-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.el-aside {
  background-color: Transparent;
  color: #333;
  height: 100%;
  .el-menu {
    height: 100%;
    background-color: Transparent;
    border-right: none;
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      text-align: left;
      min-width: 180px;
    }
    .el-submenu {
      text-align: left;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
  .content {
    margin-top: 50px;
    padding: 20px;
  }
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
