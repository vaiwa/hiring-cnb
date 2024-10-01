import styled from 'styled-components'

import NxWelcome from './nx-welcome'

const StyledApp = styled.div`
  // Your style here
`

// con x = 2

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="Task CNB" />
    </StyledApp>
  )
}

export default App
