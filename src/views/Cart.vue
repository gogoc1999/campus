<template>
  <section class="cart-page">
    <div class="cart-heading">
      <p class="section-kicker">Shopping Cart</p>
      <h1>我的购物车</h1>
      <p>勾选需要结算的商品，确认后会生成本地订单并清空已选商品。</p>
    </div>

    <el-empty v-if="cartList.length === 0" description="购物车还是空的">
      <el-button type="primary" @click="router.push('/')">去选择商铺</el-button>
    </el-empty>

    <div v-else class="cart-layout">
      <el-card class="cart-list-card" shadow="never">
        <div class="cart-toolbar">
          <el-checkbox v-model="isAllSelected" :indeterminate="isIndeterminate">
            全选
          </el-checkbox>
          <span>共 {{ cartList.length }} 件商品</span>
        </div>

        <div class="cart-list">
          <div v-for="item in cartList" :key="item.id" class="cart-item">
            <el-checkbox
              :model-value="selectedIds.includes(item.id)"
              @change="toggleItem(item.id)"
            />

            <img class="cart-item-image" :src="item.image" :alt="item.name" />

            <div class="cart-item-main">
              <div>
                <h2>{{ item.name }}</h2>
                <p>{{ item.shopName }}</p>
              </div>
              <strong>¥{{ item.price }}</strong>
            </div>

            <el-input-number
              class="cart-quantity"
              :model-value="item.quantity"
              :min="1"
              :max="99"
              @change="changeQuantity(item.id, $event)"
            />

            <div class="cart-subtotal">¥{{ item.price * item.quantity }}</div>

            <el-button type="danger" plain @click="removeItem(item.id)">删除</el-button>
          </div>
        </div>
      </el-card>

      <el-card class="cart-summary" shadow="never">
        <template #header>
          <div class="summary-title">结算信息</div>
        </template>

        <div class="summary-row">
          <span>已选商品</span>
          <strong>{{ selectedItems.length }} 件</strong>
        </div>
        <div class="summary-row">
          <span>商品数量</span>
          <strong>{{ selectedQuantity }} 份</strong>
        </div>
        <div class="summary-total">
          <span>合计</span>
          <strong>¥{{ selectedTotal }}</strong>
        </div>

        <el-button
          class="checkout-button"
          type="primary"
          size="large"
          :disabled="selectedItems.length === 0"
          @click="checkout"
        >
          结算下单
        </el-button>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const CART_STORAGE_KEY = 'campus_food_cart'
const ORDER_STORAGE_KEY = 'campus_food_orders'

const router = useRouter()

const readStorageArray = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

const cartList = ref(readStorageArray(CART_STORAGE_KEY))
const selectedIds = ref(cartList.value.map((item) => item.id))

const selectedItems = computed(() =>
  cartList.value.filter((item) => selectedIds.value.includes(item.id))
)

const selectedQuantity = computed(() =>
  selectedItems.value.reduce((total, item) => total + item.quantity, 0)
)

const selectedTotal = computed(() =>
  selectedItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
)

const isIndeterminate = computed(
  () => selectedIds.value.length > 0 && selectedIds.value.length < cartList.value.length
)

const isAllSelected = computed({
  get: () => cartList.value.length > 0 && selectedIds.value.length === cartList.value.length,
  set: (checked) => {
    selectedIds.value = checked ? cartList.value.map((item) => item.id) : []
  }
})

const syncCart = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartList.value))
}

const toggleItem = (itemId) => {
  selectedIds.value = selectedIds.value.includes(itemId)
    ? selectedIds.value.filter((id) => id !== itemId)
    : [...selectedIds.value, itemId]
}

const changeQuantity = (itemId, quantity) => {
  const target = cartList.value.find((item) => item.id === itemId)

  if (!target) {
    return
  }

  target.quantity = quantity || 1
  syncCart()
}

const removeItem = (itemId) => {
  cartList.value = cartList.value.filter((item) => item.id !== itemId)
  selectedIds.value = selectedIds.value.filter((id) => id !== itemId)
  syncCart()
  ElMessage.success('商品已删除')
}

const checkout = () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请先选择要结算的商品')
    return
  }

  const orders = readStorageArray(ORDER_STORAGE_KEY)
  const order = {
    id: `CF${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: '待支付',
    items: selectedItems.value.map((item) => ({ ...item })),
    totalQuantity: selectedQuantity.value,
    totalAmount: selectedTotal.value
  }

  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([order, ...orders]))
  cartList.value = cartList.value.filter((item) => !selectedIds.value.includes(item.id))
  selectedIds.value = []
  syncCart()
  ElMessage.success('订单已生成')
}
</script>
