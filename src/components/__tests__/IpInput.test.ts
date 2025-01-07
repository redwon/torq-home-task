import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IpInput from '../IpInput.vue'

describe('IpInput', () => {
  it('renders properly', () => {
    const wrapper = mount(IpInput, {
      props: {
        modelValue: '',
      },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(IpInput, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('192.168.1.1')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['192.168.1.1'])
  })

  it('validates IP address on blur', async () => {
    const wrapper = mount(IpInput, {
      props: {
        modelValue: 'invalid-ip',
      },
    })
    await wrapper.find('input').trigger('blur')
    expect(wrapper.find('.error-text').text()).toBe('Please enter a valid IP address')
  })

  it('emits enter event on Enter key press with valid IP', async () => {
    const wrapper = mount(IpInput, {
      props: {
        modelValue: '192.168.1.1',
      },
    })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('enter')).toBeTruthy()
  })

  it('does not emit enter event on Enter key press with invalid IP', async () => {
    const wrapper = mount(IpInput, {
      props: {
        modelValue: 'invalid-ip',
      },
    })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('enter')).toBeFalsy()
  })

  it('shows error message from props', () => {
    const errorMessage = 'API Error'
    const wrapper = mount(IpInput, {
      props: {
        modelValue: '',
        error: errorMessage,
      },
    })
    expect(wrapper.find('.error-text').text()).toBe(errorMessage)
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(IpInput, {
      props: {
        modelValue: '',
        disabled: true,
      },
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })
}) 