<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  timezone?: string
}>()

const currentTime = ref('')
const timeInterval = ref<number>()

const updateTime = () => {
  if (!props.timezone) return

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: props.timezone,
  })

  currentTime.value = formatter.format(new Date())
}

onMounted(() => {
  if (props.timezone) {
    updateTime()
    timeInterval.value = window.setInterval(updateTime, 1000)
  }
})

onUnmounted(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
})

watch(
  () => props.timezone,
  (newTimezone) => {
    if (timeInterval.value) {
      clearInterval(timeInterval.value)
    }

    if (newTimezone) {
      updateTime()
      timeInterval.value = window.setInterval(updateTime, 1000)
    } else {
      currentTime.value = ''
    }
  }
)
</script>

<template>
  <span v-if="currentTime" class="time">{{ currentTime }}</span>
</template>

<style scoped>
.time {
  margin-left: 0.5rem;
  color: #666;
  font-family: monospace;
}
</style> 