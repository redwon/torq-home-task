<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="add-button" @click="$emit('click')"><span class="plus">+</span> Add</button>
</template>

<style scoped>
.add-button {
  background: #5cc1e8;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background-color .3s;
  
  &:hover {
    background-color: #2fb4e9;
  }
}

.plus {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
