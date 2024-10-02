import { render } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'

import App from './app'

jest.mock('@tanstack/react-query')

describe('App', () => {
  beforeAll(() => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: { key: 'mocked data' },
      isPending: false,
      isFetching: false,
    })
  })

  it('should render successfully', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />)
    expect(getByText(/Task CNB/gi)).toBeTruthy()
  })
})
