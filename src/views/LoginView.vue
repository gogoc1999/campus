<template>
  <section class="auth-page">
    <el-card class="auth-card" shadow="never">
      <template #header>
        <div class="auth-title">用户登录</div>
      </template>

      <el-form label-position="top">
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-button class="auth-submit" type="primary">登录</el-button>
      </el-form>
    </el-card>
  </section>
</template>

<script setup>
</script>
