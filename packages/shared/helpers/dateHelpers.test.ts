import '@testing-library/jest-dom'
import { areSameDayUTC } from '@/helpers/dateHelpers'

describe('Date helpers', () => {
  it('Checks if two dates are the same day', () => {
    expect(areSameDayUTC(new Date(), new Date())).toBe(true)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(areSameDayUTC(new Date(), yesterday)).toBe(false)
  })
})
