import { ErrorType } from '../types'

const CNB_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

export type ExchangeRate = {
  country: string
  currency: string
  amount: number
  code: string
  rate: number
}

export const getExchangeRates = async (): Promise<[ErrorType, ExchangeRate[]?]> => {
  const response = await fetch(CNB_URL)

  if (!response.ok) return [{ status: response.status, message: '' }]

  const text = await response.text()

  const exchangeRates = _parseExchangeRates(text)

  return [null, exchangeRates]
}

export const _parseExchangeRates = (text: string): ExchangeRate[] => {
  const lines = text.split('\n').slice(2, -1) // ignore first 2 lines + last line

  const exchangeRates = lines.map((line) => _parseExchangeRateLine(line))

  return exchangeRates
}

const toNum = (str: string): number => Number(str)

export const _parseExchangeRateLine = (line: string): ExchangeRate => {
  const [country, currency, amount, code, rate] = line.split('|')

  return { country, currency, amount: toNum(amount), code, rate: toNum(rate) }
}
