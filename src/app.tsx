import styled from 'styled-components'
import RatesTable from './components/RatesTable'
import CurrencyConverter from './components/CurrencyConverter'
import { useRate } from './services/ratesService'

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  console.info('TODO HERE1')

  const { isPending, error, data } = useRate()

  console.info('TODO HERE2', isPending, error, data)

  if (isPending) return <p>Loading...</p>

  if (error) return <p>An error has occurred: {error.message}</p>

  return (
    <StyledApp>
      <h1>Task CNB</h1>
      <CurrencyConverter data={data} />
      <RatesTable data={data} />
    </StyledApp>
  )
}

export default App
