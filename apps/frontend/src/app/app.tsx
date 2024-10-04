import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'

const StyledApp = styled.div`
  // Your style here
`

const BACKEND_URL = './api/cnb-exchange-rates'

export function App() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(BACKEND_URL)
      const { data } = await response.json()
      return data
    },
  })

  if (isPending) return <p>Loading...</p>

  if (error) return <p>An error has occurred: {error.message}</p>

  return (
    <StyledApp>
      <h1>Task CNB</h1>

      <code>{isFetching ? 'Updating...' : JSON.stringify(data)}</code>
    </StyledApp>
  )
}

export default App
