<template>
  <span class="country-flag" :title="timezone || countryCode">{{
    getCountryFlag(countryCode)
  }}</span>
</template>

<script setup lang="ts">
defineProps<{
  countryCode: string // expects ISO 3166-1 alpha-2 code (e.g., 'US', 'GB', 'FR')
  timezone?: string
}>()

const getCountryFlag = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
</script>

<style scoped>
.country-flag {
  font-size: 1.5rem;
}
</style>
