//登录
<template>
  <div>
    <p>用户名: <input type="text" v-model="user" /></p>
    <p>手机号: <input type="text" v-model="del" /></p>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      del: "", //手机号
      user: "", //用户名
    };
  },
  created() {

  },
  mounted() {},
  methods: {
      login(){
          this.$axios.post(`/user/login?username=${this.user}&password=${this.del}`).then((res)=>{
          console.log(res);
          this.$router.push('/')
          localStorage.setItem('token',res.data.data.token)
      })
      }
  },
};
</script>
<style scoped lang="scss"></style>
