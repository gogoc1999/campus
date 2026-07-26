<template>
  <section class="order-page">
    <div class="order-heading">
      <p class="section-kicker">My Orders</p>
      <h1>我的订单</h1>
      <p>订单数据来自浏览器 LocalStorage，展示每笔订单的商品、总价和下单时间。</p>
    </div>

    <el-empty v-if="orderList.length === 0" description="暂无订单">
      <el-button type="primary" @click="router.push('/')">去点餐</el-button>
    </el-empty>

    <div v-else class="order-wrap">
      <el-card v-for="order in pagedOrders" :key="order.id" class="order-card" shadow="never">
        <template #header>
          <div class="order-card-header">
            <div>
              <h2>订单号：{{ order.id }}</h2>
              <p>{{ formatTime(order.createdAt) }}</p>
            </div>
            <el-tag type="warning" effect="plain">{{ order.status }}</el-tag>
          </div>
        </template>

        <div class="order-goods-list">
          <div v-for="item in order.items" :key="item.id" class="order-goods-item">
            <img class="order-goods-image" :src="item.image" :alt="item.name" />
            <div class="order-goods-main">
              <h3>{{ item.name }}</h3>
              <p>{{ item.shopName }}</p>
            </div>
            <div class="order-goods-price">
              <span>¥{{ item.price }}</span>
              <span>x {{ item.quantity }}</span>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <span>共 {{ order.totalQuantity }} 份</span>
          <strong>合计 ¥{{ order.totalAmount }}</strong>
        </div>
      </el-card>

      <div class="order-pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="orderList.length"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const ORDER_STORAGE_KEY = 'campus_food_orders'

const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(4)

const readOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

const orderList = ref(readOrders())

const pagedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return orderList.value.slice(start, start + pageSize.value)
})

const formatTime = (time) => {
  if (!time) {
    return '下单时间未知'
  }

  return new Date(time).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
