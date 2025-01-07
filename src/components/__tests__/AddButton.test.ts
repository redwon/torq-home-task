import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AddButton from '../AddButton.vue'

describe('AddButton', () => {
  it('renders properly', () => {
    const wrapper = mount(AddButton)

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('.plus').text()).toBe('+')
    expect(wrapper.text()).toContain('Add')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(AddButton)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
