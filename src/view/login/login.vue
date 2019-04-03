<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card :bordered="false" icon="log-in" title="欢迎登录">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['handleLogin']),
    handleSubmit({ username, password }) {
      let vm = this
      this.handleLogin({ username, password, vm })
    }
  }
}
</script>

<style>
</style>
