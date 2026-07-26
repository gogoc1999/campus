<template>
  <section class="login-page">
    <div class="login-panel">
      <div class="login-intro">
        <p class="login-kicker">Campus Food</p>
        <h1>欢迎回到校园外卖</h1>
        <p>使用固定测试账号登录后，用户信息会保存到浏览器 LocalStorage。</p>
      </div>

      <el-card class="login-card" shadow="never">
        <template #header>
          <div class="login-card-title">
            <span>账号登录</span>
            <el-tag type="success" effect="plain">测试环境</el-tag>
          </div>
        </template>

        <el-alert
          v-if="errorMessage"
          class="login-error"
          :title="errorMessage"
          type="error"
          show-icon
          :closable="false"
        />

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          label-position="top"
          @keyup.enter="handleLogin"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model.trim="loginForm.phone"
              maxlength="11"
              placeholder="请输入测试手机号"
              clearable
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入测试密码"
              show-password
              clearable
            />
          </el-form-item>

          <div class="test-account">
            <span>测试账号：13800138000</span>
            <span>密码：123456</span>
          </div>

          <el-button
            class="login-submit"
            type="primary"
            size="large"
            :loading="isSubmitting"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const TEST_USER = {
  phone: '13800138000',
  password: '123456',
  name: '校园测试用户',
  role: 'student'
}

const router = useRouter()
const route = useRoute()
const loginFormRef = ref(null)
const isSubmitting = ref(false)
const errorMessage = ref('')

const loginForm = reactive({
  phone: '',
  password: ''
})

const loginRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的 11 位手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginFormRef.value) {
    return
  }

  errorMessage.value = ''
  const isValid = await loginFormRef.value.validate().catch(() => false)

  if (!isValid) {
    errorMessage.value = '请先完成表单校验'
    return
  }

  isSubmitting.value = true

  const isMatched =
    loginForm.phone === TEST_USER.phone && loginForm.password === TEST_USER.password

  if (!isMatched) {
    isSubmitting.value = false
    errorMessage.value = '账号或密码错误，请使用页面中的测试账号登录'
    return
  }

  const userInfo = {
    phone: TEST_USER.phone,
    name: TEST_USER.name,
    role: TEST_USER.role,
    loginTime: new Date().toISOString()
  }

  localStorage.setItem('campus_food_user', JSON.stringify(userInfo))
  ElMessage.success('登录成功')
  await router.replace(route.query.redirect || '/')
}
</script>
