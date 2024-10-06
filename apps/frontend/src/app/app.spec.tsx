import { render } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'

import App from './app'

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

const mockedUseQuery = useQuery as jest.Mock

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
    expect(getByText(/Task CNB/gi)).toBeTruthy()
  })
})
