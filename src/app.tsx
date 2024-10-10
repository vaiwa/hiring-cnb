import styled from 'styled-components'
import RatesTable from './components/RatesTable'
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter'
import { useRate } from './services/ratesService'
import { Toast } from './components/Toast/Toast'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding-top: 40px;

  background: linear-gradient(150deg, #63bba4 0%, #fec957 140%);
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export function App() {
  const { isPending, error, data } = useRate()

  const components = isPending ? (
    <p>Loading...</p>
  ) : error ? (
    <p>An error has occurred: {error.message}</p>
  ) : (
    <Container>
      <CurrencyConverter data={data} />
      <RatesTable data={data} />
    </Container>
  )

  return (
    <StyledApp>
      <h1>Task ČNB</h1>
      {components}
      <Toast />
    </StyledApp>
  )
}

export default App
