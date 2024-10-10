import styled from 'styled-components'
import toast from 'react-hot-toast'

const Container = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #222;
  text-align: center;
  cursor: pointer;
`

export const ConvertedAmount = ({ value }: { value: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success('Converted amount copied to clipboard')
    } catch (err) {
      console.error('Failed to copy amount: ', err)
    }
  }

  return <Container onClick={handleCopy}>{value}</Container>
}
