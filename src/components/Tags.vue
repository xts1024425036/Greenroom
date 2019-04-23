<template>
  <div class="tags">
    <ul>
      <span>篮球大数据分析系统</span>
    <span>{{navTitle}}</span>
    </ul>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      navTitle: "系统首页"
    };
  },
  created() {
    if(!sessionStorage.getItem('navTitle')) {
        this.navTitle == '系统首页'
    } else {
        this.navTitle = sessionStorage.getItem('navTitle')
    }
  },
  mounted() {
    this.$router.afterEach((to,from)=>{
        this.navTitle = to.meta.title || "";
        sessionStorage.setItem('navTitle', this.navTitle)
    });
  }
};
</script>

<style lang="less" scoped>
.tags {
  position: fixed;
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 5px 10px #ddd;
  text-align: left;
  line-height: 50px;
  z-index:11;
  ul {
    width: 100%;
    padding: 0 20px;
    span {
    background-color: #409eff;
    color: #fff;
    display: inline-block;
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    border-radius: 4px;
  }
  }
  
}
</style>