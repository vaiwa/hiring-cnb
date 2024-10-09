import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import type { ExchangeRate } from '../app'

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  text-align: center;
  color: #333;
`

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`

const ConvertedAmount = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #222;
  text-align: center;
`

type CurrencyConverterProps = {
  data: ExchangeRate[]
}

const CurrencyConverter = ({ data }: CurrencyConverterProps) => {
  const [czkAmount, setCzkAmount] = useState<number>(0)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR')
  const [convertedAmount, setConvertedAmount] = useState<number>(0)

  useEffect(() => {
    const line = data.find((line) => line.code === selectedCurrency)
    if (!line) {
      console.error('No Line found for selectedCurrency:', selectedCurrency, data)
      return
    }
    const rate = line.amount / line.rate
    setConvertedAmount(czkAmount * rate)
  }, [data, czkAmount, selectedCurrency])

  const CurrencyOptions = useMemo(
    () =>
      data
        .sort((a, b) => a.country.localeCompare(b.country))
        .map((line) => (
          <option value={line.code}>
            {line.country} {line.currency} - {line.code}
          </option>
        )),
    [data],
  )

  return (
    <Container>
      <Title>CZK to Currency Converter</Title>

      <div>
        <Label>Amount in CZK:</Label>
        <Input
          type="number"
          value={czkAmount}
          onChange={(e) => {
            setCzkAmount(parseFloat(e.target.value) || 0) // TODO use zod for validation and better ui
          }}
        />
      </div>

      <div>
        <Label>Select Currency:</Label>
        <Select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
          {CurrencyOptions}
        </Select>
      </div>

      <div>
        <h3>Converted Amount:</h3>
        <ConvertedAmount>
          {convertedAmount.toFixed(2)} {selectedCurrency}
        </ConvertedAmount>
      </div>
    </Container>
  )
}

export default CurrencyConverter
