import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import RatesTable from './components/RatesTable'

const StyledApp = styled.div`
  // Your style here
`

const BACKEND_URL = './api/cnb-exchange-rates'

export type ExchangeRate = {
  country: string
  currency: string
  amount: number
  code: string
  rate: number
}

export function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(BACKEND_URL)
      const { data } = await response.json()
      return data as ExchangeRate[] // TODO add tRPC to keep the types
    },
  })

  if (isPending) return <p>Loading...</p>

  if (error) return <p>An error has occurred: {error.message}</p>

  return (
    <StyledApp>
      <h1>Task CNB</h1>

      <RatesTable data={data} />
    </StyledApp>
  )
}

export default App
