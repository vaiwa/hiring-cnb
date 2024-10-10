import styled from 'styled-components'
import type { ExchangeRate } from '../services/ratesService'

// Main container for the grid
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 1px;
  margin: 20px 0;
  width: 100%;
  max-width: 500px;
`

// Header row
const GridHeader = styled.div`
  display: contents;
  font-weight: bold;
  background-color: #f4f4f4;

  span {
    padding: 2px 5px;
    border: 1px solid #ddd;
    background-color: #f4f4f4;
  }
`

// Data row
const GridRow = styled.div`
  display: contents;

  span {
    padding: 2px 5px;
    border: 1px solid #ddd;
  }
`

const SpanRight = styled.span`
  text-align: right;
`

const SpanCenter = styled.span`
  text-align: center;
`

type RatesTableProps = {
  data: ExchangeRate[]
}

const RatesTable = ({ data }: RatesTableProps) => {
  return (
    <GridContainer data-testid="rates-table">
      <GridHeader>
        <SpanCenter>Country</SpanCenter>
        <SpanCenter>Currency</SpanCenter>
        <SpanCenter>Amount</SpanCenter>
        <SpanCenter>Code</SpanCenter>
        <SpanCenter>Rate</SpanCenter>
      </GridHeader>
      {data.map(({ country, currency, amount, code, rate }) => (
        <GridRow key={code}>
          <span>{country}</span>
          <span>{currency}</span>
          <span>{amount}</span>
          <span>{code}</span>
          <SpanRight>{rate.toFixed(2)}</SpanRight>
        </GridRow>
      ))}
    </GridContainer>
  )
}

export default RatesTable
