<script setup>
import ProductCard from "@/components/ProductCard.vue";
import Pagination from "@/components/Pagination.vue";

import {
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  ref,
} from "vue";

const page = ref(1);

onBeforeMount(() => {
  console.log("onBeforeMount");
  // persiapan atau effek sebelum mounting
});

onMounted(() => {
  console.log("onMounted");
});

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
  // persiapan atau effek sebelum update
});

onUnmounted(() => {
  console.log("onUnmounted");
});

function nextPage() {
  page.value++;
}
</script>

<template>
  <main>
    {{ page }}
    <button @click="nextPage">Next</button>
    <div class="product-grid">
      <ProductCard />
    </div>
    <div class="pagination">
      <Pagination />
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
