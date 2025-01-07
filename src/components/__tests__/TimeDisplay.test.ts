import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import TimeDisplay from '../TimeDisplay.vue'

describe('TimeDisplay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const mockDate = new Date('2025-01-07T12:00:00Z')
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders nothing when no timezone is provided', () => {
    const wrapper = mount(TimeDisplay)
    expect(wrapper.find('.time').exists()).toBe(false)
  })

  it('renders time in the correct timezone', async () => {
    const wrapper = mount(TimeDisplay, {
      props: {
        timezone: 'America/New_York'
      }
    })

    await flushPromises()
    await vi.advanceTimersByTimeAsync(0)
    
    expect(wrapper.find('.time').exists()).toBe(true)
    expect(wrapper.text()).toContain('07:00:00')
  })

  it('updates time every second', async () => {
    const wrapper = mount(TimeDisplay, {
      props: {
        timezone: 'UTC'
      }
    })
    
    await flushPromises()
    await vi.advanceTimersByTimeAsync(0)
    expect(wrapper.text()).toContain('12:00:00')
    
    await vi.advanceTimersByTimeAsync(1000)
    await flushPromises()
    expect(wrapper.text()).toContain('12:00:01')
  })

  it('handles timezone changes', async () => {
    const wrapper = mount(TimeDisplay, {
      props: {
        timezone: 'UTC'
      }
    })
    
    await flushPromises()
    await vi.advanceTimersByTimeAsync(0)
    expect(wrapper.text()).toContain('12:00:00')
    
    await wrapper.setProps({ timezone: 'America/New_York' })
    await flushPromises()
    await vi.advanceTimersByTimeAsync(0)
    expect(wrapper.text()).toContain('07:00:00')
  })

  it('clears interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')
    const wrapper = mount(TimeDisplay, {
      props: {
        timezone: 'UTC'
      }
    })
    
    wrapper.unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
  })
}) 