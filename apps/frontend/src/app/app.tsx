import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'

const StyledApp = styled.div`
  // Your style here
`

// const CNB_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
const CNB_URL = 'https://api.github.com/repos/TanStack/query'

export function App() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(CNB_URL)
      console.info('RES', response)
      const json = await response.json()
      console.info('JSON', json)
      return json
    },
  })

  if (isPending) return <p>'Loading...'</p>

  if (error) return <p>'An error has occurred: ' + error.message</p>

  return (
    <StyledApp>
      <h1>Task CNB</h1>

      <code>{isFetching ? 'Updating...' : JSON.stringify(data)}</code>
    </StyledApp>
  )
}

export default App
