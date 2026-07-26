<template>
  <el-config-provider>
    <div class="app-shell">
      <header class="app-header">
        <RouterLink class="brand" to="/">校园外卖</RouterLink>
        <nav class="nav-links">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/goods/1">商品</RouterLink>
          <RouterLink to="/cart">购物车</RouterLink>
          <RouterLink to="/orders">订单</RouterLink>
          <template v-if="userInfo">
            <span class="user-name">{{ userInfo.name }}</span>
            <el-button type="danger" plain size="small" @click="handleLogout">退出</el-button>
          </template>
          <RouterLink v-else to="/login">登录</RouterLink>
        </nav>
      </header>

      <main class="app-main">
        <RouterView />
      </main>
    </div>
  </el-config-provider>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const USER_STORAGE_KEY = 'campus_food_user'

const router = useRouter()
const userInfo = ref(null)

const loadUserInfo = () => {
  try {
    userInfo.value = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null')
  } catch {
    userInfo.value = null
  }
}

const handleLogout = async () => {
  localStorage.removeItem(USER_STORAGE_KEY)
  userInfo.value = null
  ElMessage.success('已退出登录')
  await router.replace('/login')
}

onMounted(() => {
  loadUserInfo()
  window.addEventListener('storage', loadUserInfo)
  window.addEventListener('campus-user-updated', loadUserInfo)
})

onUnmounted(() => {
  window.removeEventListener('storage', loadUserInfo)
  window.removeEventListener('campus-user-updated', loadUserInfo)
})
</script>
