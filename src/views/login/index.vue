<template>
  <div class="login-container">
    <Form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
      <h3 class="title">请登录教师账号</h3>
      <FormItem prop="username">
        <Input type="text" v-model="loginForm.username" name="userName" auto-complete="on" placeholder="请输入用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input  type="password"
                v-model="loginForm.password"
                name="password"
                auto-complete="on"
                placeholder="请输入密码"
                @keyup.enter.native="handleLogin">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button :loading="loading" type="primary" style="width: 100%" @click.native.prevent="handleLogin">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Message } from 'iview'
import request from '@/utils/request';
import { setToken } from '@/utils/lib';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名'}],
        password: [{ required: true, trigger: 'blur', message: '请输入密码'}]
      },
      loading: false,
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          request.post(`/User/login`, {
            account: this.loginForm.username,
            password: this.loginForm.password
          })
          .then((res)=>{
            this.loading = false;
            if(res.code != 0){
              Message.error(res.message);
              return;
            }

            setToken(res.data.token);
            this.$router.push({ path: '/teacherCurr' })
          })
          .catch(()=>{
            this.loading = false;
            Message.error('登录失败，请稍后再试');
          });

          // this.$store.dispatch('Login', this.loginForm).then(() => {
          //   this.loading = false;
          //   //  登录成功
          //   this.$router.push({ path: '/platform' })
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          return false
        }
      })
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
