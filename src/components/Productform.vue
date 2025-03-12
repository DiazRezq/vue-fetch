<script setup>
import { ref, defineEmits, watchEffect, computed } from "vue";

const props = defineProps({
  product: Object,
});

const title = ref("");
const description = ref("");
const price = ref("");
const images = ref("");
const id = ref("");

watchEffect(() => {
  if (props.product) {
    title.value = props.product?.title;
    description.value = props.product?.description;
    price.value = props.product?.price;
    images.value = props.product?.images;
    id.value = props.product?.id;
  }
});

const showForm = ref(false);
const isUpdate = computed(() => !!props.product);

const emit = defineEmits(["create-product", "update-product"]);

function saveProduct() {
  const formData = {
    title: title.value,
    description: description.value,
    price: price.value,
    images: images.value,
  };

  if (isUpdate.value) {
    emit("update-product", formData);
  } else {
    emit("create-product", formData);
  }
}
</script>

<template>
  <div class="form-container">
    <button @click="showForm = !showForm">
      {{ isUpdate ? "Update" : "Create" }} Product
    </button>
    <div v-if="showForm" class="product-form">
      <form @submit.prevent="saveProduct">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="description" required />
        <label for="price">Price:</label>
        <input type="text" id="price" v-model="price" />
        <label for="images">Images:</label>
        <input type="text" id="images" v-model="images" />
        <button type="submit">Saves</button>
        <button class="close-button" type="button" @click="showForm = false">
          Close
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.form-container button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #00b894;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.form-container button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.form-container button:focus {
  outline: none;
}

.form-container button:active {
  background-color: #00b894;
  transform: translateY(1px);
}

.product-form {
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

.product-form input[type="text"],
.product-form input[type="number"] {
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.close-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}
</style>
