import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders properly', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('.spinner').exists()).toBe(true)
  })
})
