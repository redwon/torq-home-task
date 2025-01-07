import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IpLookupEntry from '../IpLookupEntry.vue'
import { getIpDetails } from '../../services/getIpDetails'

vi.mock('../../services/getIpDetails')

describe('IpLookupEntry', () => {
  const mockEntry = {
    number: 1,
    ip: '8.8.8.8'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders properly', () => {
    const wrapper = mount(IpLookupEntry, {
      props: {
        entry: mockEntry
      }
    })

    expect(wrapper.find('.number').text()).toBe('1')
    expect(wrapper.findComponent({ name: 'IpInput' }).exists()).toBe(true)
  })

  it('emits onChange event when IP is updated', async () => {
    const wrapper = mount(IpLookupEntry, {
      props: {
        entry: mockEntry
      }
    })

    const ipInput = wrapper.findComponent({ name: 'IpInput' })
    await ipInput.vm.$emit('update:modelValue', '1.1.1.1')

    expect(wrapper.emitted('onChange')).toBeTruthy()
    expect(wrapper.emitted('onChange')![0]).toEqual(['1.1.1.1'])
  })

  it('shows loading state during IP lookup', async () => {
    vi.mocked(getIpDetails).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ip: '8.8.8.8',
        countryName: '',
        countryCode: '',
        timezone: '',
        error: ''
      }), 100))
    )
    
    const wrapper = mount(IpLookupEntry, {
      props: {
        entry: mockEntry
      }
    })

    const ipInput = wrapper.findComponent({ name: 'IpInput' })
    await ipInput.vm.$emit('blur')

    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(true)

    await wrapper.vm.$nextTick()
  })

  it('handles error state', async () => {
    vi.mocked(getIpDetails).mockResolvedValue({
      ip: '8.8.8.8',
      countryName: '',
      countryCode: '',
      timezone: '',
      error: 'Invalid IP'
    })
    
    const wrapper = mount(IpLookupEntry, {
      props: {
        entry: mockEntry
      }
    })

    const ipInput = wrapper.findComponent({ name: 'IpInput' })
    await ipInput.vm.$emit('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent({ name: 'CountryFlag' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'TimeDisplay' }).exists()).toBe(false)
  })

  it('displays country and time info on successful lookup', async () => {
    vi.mocked(getIpDetails).mockResolvedValue({
      ip: '8.8.8.8',
      countryName: 'United States',
      countryCode: 'US',
      timezone: 'America/New_York'
    })
    
    const wrapper = mount(IpLookupEntry, {
      props: {
        entry: mockEntry
      }
    })

    const ipInput = wrapper.findComponent({ name: 'IpInput' })
    await ipInput.vm.$emit('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent({ name: 'CountryFlag' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'TimeDisplay' }).exists()).toBe(true)
  })
}) 