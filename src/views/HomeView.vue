<script setup>
import ProductCard from "@/components/ProductCard.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading.vue";
import Productform from "@/components/Productform.vue";

import { ref, watchEffect } from "vue";
import axios from "axios";

const products = ref([]);
const page = ref(1);
const limit = ref(8);

const Isloading = ref(true);

async function fetchProducts() {
  const API_URL = `http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`;
  try {
    Isloading.value = true;
    const response = await axios.get(API_URL);
    products.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    Isloading.value = false;
  }
}

watchEffect(() => {
  fetchProducts();
});

function changePage(newPage) {
  if (newPage < 1) return;
  if (newPage > products.value.pages) return;
  page.value = newPage;
}

async function createProduct(product) {
  try {
    await axios.post("http://localhost:3000/products", product);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div v-if="Isloading">
    <Loading />
  </div>
  <main v-else>
    <Productform @create-product="createProduct" />
    <div class="product-grid">
      <ProductCard
        v-for="(product, index) in products.data"
        :key="index"
        :product="product"
      />
    </div>
    <div class="pagination">
      <Pagination
        :page="page"
        :totalPages="products.pages"
        @change-page="changePage"
      />
    </div>
  </main>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 80%;
  margin: 0 auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
