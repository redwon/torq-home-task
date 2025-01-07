<script setup lang="ts">
defineProps<{
  size?: string
}>()
</script>

<template>
  <span
    class="spinner"
    :style="{
      width: size || '1.5rem',
      height: size || '1.5rem',
    }"
  />
</template>

<style scoped>
.spinner {
  display: inline-block;
  border-style: solid;
  border-radius: 50%;
  border-width: 3px;
  border-color: #f3f3f3;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
