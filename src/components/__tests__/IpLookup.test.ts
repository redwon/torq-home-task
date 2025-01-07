import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import IpLookup from '../IpLookup.vue'
import IpLookupEntry from '../IpLookupEntry.vue'
import AddButton from '../AddButton.vue'

import type { IpEntry } from '../IpLookup.vue'

describe('IpLookup', () => {
  it('renders properly with initial state', () => {
    const wrapper = mount(IpLookup)

    expect(wrapper.find('.title').text()).toBe('IP Lookup')
    expect(wrapper.find('.description').text()).toBe(
      'Enter one or more IP addresses and get their country'
    )
    expect(wrapper.findComponent(AddButton).exists()).toBe(true)
    expect(wrapper.findAllComponents(IpLookupEntry)).toHaveLength(1)
  })

  it('adds new IP entry when clicking add button', async () => {
    const wrapper = mount(IpLookup)

    expect(wrapper.findAllComponents(IpLookupEntry)).toHaveLength(1)

    await wrapper.findComponent(AddButton).trigger('click')

    expect(wrapper.findAllComponents(IpLookupEntry)).toHaveLength(2)
  })

  it('updates IP entry when onChange event is emitted', async () => {
    const wrapper = mount(IpLookup)
    const testIp = '192.168.1.1'

    await wrapper.findComponent(IpLookupEntry).vm.$emit('onChange', testIp)

    const firstEntry = wrapper.findComponent(IpLookupEntry).props('entry') as IpEntry
    expect(firstEntry.ip).toBe(testIp)
  })
})
