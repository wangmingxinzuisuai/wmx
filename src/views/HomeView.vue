
<template>
<div>
<el-container>
  <el-header>
    
    <div>梦学谷会员管理系统</div>
    <div>admin</div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#666fff"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item :index="item.path"  v-for="(item, index) in navList" :key="index">
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main> <router-view/></el-main>
  </el-container>
</el-container>

</div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      navList:[
        {name:'首页',id:'1',path:'/home'},
        {name:'会员管理',id:'1',path:'/member'},
        {name:'供应商管理',id:'1',path:'/supplier'},
        {name:'商品管理',id:'1',path:'/goods'},
        {name:'员工管理',id:'1',path:'/staff'},
      ],//nav侧边栏
    }
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style scoped lang='scss'>
.el-header{
  height: 60px;
  line-height: 60px;
  background-color: #666fff;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  color: white;
}
.el-aside{
  height: 90vh;
}
</style>
