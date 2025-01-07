<script setup lang="ts">
import { ref } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import IpInput from './IpInput.vue'
import TimeDisplay from './TimeDisplay.vue'
import CountryFlag from './CountryFlag.vue'

import { getIpDetails } from '../services/getIpDetails'
import { isValidIp } from '../utils/isValidIp'

import type { IpEntry } from './IpLookup.vue'

const props = defineProps<{
  entry: IpEntry
}>()

const emit = defineEmits<{
  (e: 'onChange', ip: string): void
}>()

const loading = ref(false)
const error = ref<string>()
const countryCode = ref<string>()
const timezone = ref<string>()
const checkedIp = ref<string>()

const lookupIp = async () => {
  if (!props.entry.ip.trim() || !isValidIp(props.entry.ip)) {
    return
  }

  loading.value = true
  error.value = undefined
  countryCode.value = undefined
  timezone.value = undefined
  checkedIp.value = undefined

  const data = await getIpDetails(props.entry.ip)

  if (data.error) {
    error.value = data.error
  } else {
    countryCode.value = data.countryCode
    timezone.value = data.timezone
    checkedIp.value = data.ip
  }

  loading.value = false
}
</script>

<template>
  <div class="entry">
    <div class="number">{{ entry.number }}</div>
    <div class="input-wrapper">
      <IpInput
        :disabled="loading"
        :error="error"
        :model-value="entry.ip"
        @update:model-value="(newValue) => emit('onChange', newValue)"
        @blur="lookupIp"
        @enter="lookupIp"
      />
      <div class="entry-status">
        <div v-if="loading" class="loading-indicator">
          <LoadingSpinner />
        </div>
        <span v-else-if="countryCode && entry.ip === checkedIp" class="country">
          <CountryFlag :countryCode="countryCode" :timezone="timezone" />
          <TimeDisplay :timezone="timezone" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.entry {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.number {
  width: 2rem;
  height: 2rem;
  margin-top: 3px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #666;
}

.input-wrapper {
  flex: 1;
  display: flex;
}

.entry-status {
  width: 110px;
  flex-shrink: 0;
  font-size: 0.9rem;
  padding-left: 10px;
}

.country {
  display: flex;
  align-items: center;
}

.loading-indicator {
  display: flex;
  margin-top: 5px;
}
</style>
