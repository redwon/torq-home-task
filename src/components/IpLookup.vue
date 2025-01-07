<script setup lang="ts">
import { ref } from 'vue'
import IpLookupEntry from './IpLookupEntry.vue'
import AddButton from './AddButton.vue'

export type IpEntry = {
  ip: string
  number: number
}

const ipEntries = ref<IpEntry[]>([
  {
    ip: '',
    number: 1,
  },
])

const addIpEntry = () => {
  ipEntries.value.push({
    ip: '',
    number: ipEntries.value.length + 1,
  })
}

const updateEntry = (index: number, ip: string) => {
  ipEntries.value[index].ip = ip
}
</script>

<template>
  <div class="ip-lookup">
    <h1 class="title">IP Lookup</h1>
    <p class="description">Enter one or more IP addresses and get their country</p>

    <AddButton @click="addIpEntry" />

    <div class="entries">
      <IpLookupEntry
        v-for="(entry, index) in ipEntries"
        :key="index"
        :entry="entry"
        @onChange="(ip) => updateEntry(index, ip)"
      />
    </div>
  </div>
</template>

<style scoped>
.ip-lookup {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 2rem;
}

.entries {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
