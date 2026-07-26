<template>
  <section class="goods-page">
    <div class="goods-header">
      <el-button plain @click="router.back()">返回商铺</el-button>
      <div>
        <p class="section-kicker">{{ currentShop?.category || 'Campus Food' }}</p>
        <h1>{{ currentShop?.name || '商铺不存在' }}</h1>
        <p>{{ currentShop?.description || '请返回首页重新选择商铺。' }}</p>
      </div>
    </div>

    <el-empty v-if="!currentShop" description="未找到对应商铺" />

    <div v-else class="goods-grid">
      <el-card v-for="goods in goodsList" :key="goods.id" class="goods-card" shadow="hover">
        <img class="goods-image" :src="goods.image" :alt="goods.name" />

        <div class="goods-content">
          <div class="goods-title-row">
            <h2>{{ goods.name }}</h2>
            <strong>¥{{ goods.price }}</strong>
          </div>
          <p>{{ goods.description }}</p>

          <div class="goods-footer">
            <span>月售 {{ goods.sales }}</span>
            <el-button type="primary" @click="addToCart(goods)">加入购物车</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const CART_STORAGE_KEY = 'campus_food_cart'

const route = useRoute()
const router = useRouter()

const shops = [
  {
    id: 1,
    name: '一食堂热炒档',
    category: '热炒盖饭',
    description: '现炒快餐、盖浇饭和汤品，适合午晚餐快速下单。'
  },
  {
    id: 2,
    name: '学苑轻食社',
    category: '轻食沙拉',
    description: '低脂套餐、三明治和鲜榨果汁，适合自习前后补能。'
  },
  {
    id: 3,
    name: '南门面馆',
    category: '面食粉类',
    description: '牛肉面、拌面和酸辣粉，夜宵时段也能稳定出餐。'
  },
  {
    id: 4,
    name: '图书馆咖啡角',
    category: '咖啡甜品',
    description: '咖啡、贝果和小蛋糕，适合早八和论文冲刺。'
  }
]

const goodsMap = {
  1: [
    {
      id: 101,
      name: '招牌鸡腿饭',
      price: 18,
      sales: 236,
      description: '卤香鸡腿配青菜和米饭，午餐档口人气款。',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 102,
      name: '番茄炒蛋盖饭',
      price: 13,
      sales: 184,
      description: '酸甜番茄搭配滑嫩炒蛋，清爽不腻。',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 103,
      name: '紫菜蛋花汤',
      price: 5,
      sales: 152,
      description: '热汤小份，适合搭配主食。',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80'
    }
  ],
  2: [
    {
      id: 201,
      name: '鸡胸肉能量碗',
      price: 24,
      sales: 128,
      description: '鸡胸肉、玉米、紫甘蓝和杂粮饭组合。',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 202,
      name: '金枪鱼三明治',
      price: 16,
      sales: 96,
      description: '全麦面包搭配金枪鱼和生菜。',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 203,
      name: '鲜橙汁',
      price: 12,
      sales: 143,
      description: '现榨橙汁，冷饮默认少冰。',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80'
    }
  ],
  3: [
    {
      id: 301,
      name: '红烧牛肉面',
      price: 19,
      sales: 211,
      description: '牛肉块、青菜和劲道面条，汤底浓郁。',
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 302,
      name: '葱油拌面',
      price: 12,
      sales: 176,
      description: '葱香浓郁，适合赶课前快速解决。',
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 303,
      name: '酸辣粉',
      price: 14,
      sales: 198,
      description: '酸辣开胃，可备注微辣或中辣。',
      image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=700&q=80'
    }
  ],
  4: [
    {
      id: 401,
      name: '冰拿铁',
      price: 18,
      sales: 172,
      description: '经典冰拿铁，默认无糖。',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 402,
      name: '蓝莓贝果',
      price: 15,
      sales: 88,
      description: '外韧内软，搭配咖啡刚好。',
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 403,
      name: '原味芝士蛋糕',
      price: 16,
      sales: 109,
      description: '小份甜点，适合下午茶。',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80'
    }
  ]
}

const shopId = computed(() => Number(route.params.shopId))
const currentShop = computed(() => shops.find((shop) => shop.id === shopId.value))
const goodsList = computed(() => goodsMap[shopId.value] || [])

const addToCart = (goods) => {
  const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
  const existingItem = cart.find((item) => item.id === goods.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: goods.id,
      shopId: currentShop.value.id,
      shopName: currentShop.value.name,
      name: goods.name,
      price: goods.price,
      image: goods.image,
      quantity: 1
    })
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  ElMessage.success(`${goods.name} 已加入购物车`)
}
</script>
