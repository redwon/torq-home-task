import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import CountryFlag from '../CountryFlag.vue'

describe('CountryFlag', () => {
  it('renders correct flag emoji for country code', () => {
    const wrapper = mount(CountryFlag, {
      props: {
        countryCode: 'US'
      }
    })

    expect(wrapper.text()).toBe('🇺🇸')
  })

  it('shows country code as title when timezone is not provided', () => {
    const wrapper = mount(CountryFlag, {
      props: {
        countryCode: 'GB'
      }
    })

    expect(wrapper.attributes('title')).toBe('GB')
  })

  it('shows timezone as title when provided', () => {
    const wrapper = mount(CountryFlag, {
      props: {
        countryCode: 'FR',
        timezone: 'Europe/Paris'
      }
    })

    expect(wrapper.attributes('title')).toBe('Europe/Paris')
  })
}) 