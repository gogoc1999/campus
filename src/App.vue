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
          <RouterLink to="/login">登录</RouterLink>
        </nav>
      </header>

      <main class="app-main">
        <RouterView />
      </main>
    </div>
  </el-config-provider>
</template>

<script setup>
</script>
