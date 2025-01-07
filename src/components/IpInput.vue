<script setup lang="ts">
import { ref, watch } from 'vue'
import { isValidIp } from '../utils/isValidIp'

type Props = {
  modelValue: string
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'enter'): void
}>()

const validationError = ref<string>('')

const validateIp = (ip: string): boolean => {
  if (!ip.trim()) {
    validationError.value = ''
    return false
  }

  if (!isValidIp(ip)) {
    validationError.value = 'Please enter a valid IP address'
    return false
  }

  validationError.value = ''
  return true
}

watch(
  () => props.modelValue,
  () => {
    if (validationError.value) {
      validationError.value = ''
    }
  }
)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (validateIp(props.modelValue)) {
      emit('enter')
    }
  }
}
</script>

<template>
  <div class="input-container">
    <input
      type="text"
      placeholder="192.168.1.1"
      :class="{ error: error || validationError }"
      :disabled="disabled"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="validateIp(modelValue), emit('blur')"
      @keydown="handleKeydown"
    />
    <div class="input-status">
      <span v-if="validationError" class="error-text">{{ validationError }}</span>
      <span v-else-if="error" class="error-text">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  position: relative;
  padding-bottom: 20px;
  flex: 1;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input.error {
  border-color: #ff4444;
}

.input-status {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 0.9rem;
}

.error-text {
  color: #ff4444;
  white-space: nowrap;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
