<template>
  <section class="home-page">
    <div class="home-heading">
      <p class="section-kicker">Campus Canteen</p>
      <h1>今天想吃哪一家？</h1>
      <p>精选校园周边常用商铺，点击商铺即可查看商品并加入购物车。</p>
    </div>

    <div class="shop-grid">
      <el-card
        v-for="shop in shopList"
        :key="shop.id"
        class="shop-card"
        shadow="hover"
        @click="goGoods(shop.id)"
      >
        <div class="shop-cover" :style="{ backgroundImage: `url(${shop.cover})` }">
          <el-tag class="shop-badge" type="success" effect="dark">{{ shop.category }}</el-tag>
        </div>

        <div class="shop-info">
          <div class="shop-title-row">
            <h2>{{ shop.name }}</h2>
            <span>{{ shop.rating }} 分</span>
          </div>
          <p>{{ shop.description }}</p>
          <div class="shop-meta">
            <span>起送 ¥{{ shop.minOrder }}</span>
            <span>{{ shop.deliveryTime }} 分钟</span>
            <span>{{ shop.distance }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const shopList = [
  {
    id: 1,
    name: '一食堂热炒档',
    category: '热炒盖饭',
    rating: 4.8,
    minOrder: 12,
    deliveryTime: 25,
    distance: '300m',
    description: '现炒快餐、盖浇饭和汤品，适合午晚餐快速下单。',
    cover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: '学苑轻食社',
    category: '轻食沙拉',
    rating: 4.7,
    minOrder: 18,
    deliveryTime: 20,
    distance: '520m',
    description: '低脂套餐、三明治和鲜榨果汁，适合自习前后补能。',
    cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: '南门面馆',
    category: '面食粉类',
    rating: 4.6,
    minOrder: 10,
    deliveryTime: 18,
    distance: '680m',
    description: '牛肉面、拌面和酸辣粉，夜宵时段也能稳定出餐。',
    cover: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: '图书馆咖啡角',
    category: '咖啡甜品',
    rating: 4.9,
    minOrder: 15,
    deliveryTime: 15,
    distance: '220m',
    description: '咖啡、贝果和小蛋糕，适合早八和论文冲刺。',
    cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
  }
]

const goGoods = (shopId) => {
  router.push(`/goods/${shopId}`)
}
</script>
