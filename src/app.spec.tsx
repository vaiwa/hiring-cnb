import { render } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { describe, vi, Mock, it, expect } from 'vitest'

import App from './app'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

const mockedUseQuery = useQuery as Mock

describe('App', () => {
  it('renders loading state', () => {
    mockedUseQuery.mockReturnValue({
      isPending: true,
      data: null,
    })

    const { getByText } = render(<App />)
    expect(getByText(/Loading/gi)).toBeTruthy()
  })

  it('should render successfully', () => {
    mockedUseQuery.mockReturnValue({
      data: [],
    })

    const { baseElement } = render(<App />)
    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    mockedUseQuery.mockReturnValue({
      data: [],
    })

    const { getByText } = render(<App />)
    expect(getByText(/Task ČNB/gi)).toBeTruthy()
  })

  it('should have a CurrencyConverter component rendered', () => {
    mockedUseQuery.mockReturnValue({
      data: [
        { country: 'EMU', currency: 'euro', amount: 1, code: 'EUR', rate: 25.35 },
        { country: 'United Kingdom', currency: 'pound', amount: 1, code: 'GBP', rate: 30.273 },
        { country: 'USA', currency: 'dollar', amount: 1, code: 'USD', rate: 23.135 },
      ],
    })

    const { getByTestId } = render(<App />)
    expect(getByTestId('currency-converter')).toBeTruthy()
  })

  it('should have a RatesTable component rendered', () => {
    mockedUseQuery.mockReturnValue({
      data: [
        { country: 'EMU', currency: 'euro', amount: 1, code: 'EUR', rate: 25.35 },
        { country: 'United Kingdom', currency: 'pound', amount: 1, code: 'GBP', rate: 30.273 },
        { country: 'USA', currency: 'dollar', amount: 1, code: 'USD', rate: 23.135 },
      ],
    })

    const { getByTestId } = render(<App />)
    expect(getByTestId('rates-table')).toBeTruthy()
  })
})
