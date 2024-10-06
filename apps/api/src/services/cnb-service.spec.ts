import { getExchangeRates, _parseExchangeRates, _parseExchangeRateLine } from './cnb-service'

describe('_parseExchangeRateLine', () => {
  it('should parse a single exchange rate line', () => {
    const line = 'Czech Republic|Koruna|1|CZK|23.5'
    const result = _parseExchangeRateLine(line)

    expect(result).toEqual({ country: 'Czech Republic', currency: 'Koruna', amount: 1, code: 'CZK', rate: 23.5 })
  })

  it('should handle parsing when amount and rate are converted to numbers', () => {
    const line = 'USA|Dollar|10|USD|20.5'
    const result = _parseExchangeRateLine(line)

    expect(result.amount).toBe(10)
    expect(result.rate).toBe(20.5)
  })
})

describe('_parseExchangeRates', () => {
  it('should parse exchange rates from the text input', () => {
    const inputText = 'header1\nheader2\nCzech Republic|Koruna|1|CZK|23.5\nUSA|Dollar|1|USD|22.5\nfooter'
    const result = _parseExchangeRates(inputText)

    expect(result).toEqual([
      { country: 'Czech Republic', currency: 'Koruna', amount: 1, code: 'CZK', rate: 23.5 },
      { country: 'USA', currency: 'Dollar', amount: 1, code: 'USD', rate: 22.5 },
    ])
  })

  it('should return an empty array if the input text contains no data lines', () => {
    const inputText = 'header1\nheader2\nfooter'
    const result = _parseExchangeRates(inputText)

    expect(result).toEqual([])
  })
})

describe('getExchangeRates', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return exchange rates when the fetch is successful', async () => {
    const mockText = 'header1\nheader2\nCzech Republic|Koruna|1|CZK|23.5\nUSA|Dollar|1|USD|22.5\nfooter'
    const mockResponse = { ok: true, text: jest.fn().mockResolvedValue(mockText) }

    global.fetch = jest.fn().mockResolvedValue(mockResponse as Partial<Response> as Response)

    const [error, exchangeRates] = await getExchangeRates()

    expect(error).toBeNull()
    expect(exchangeRates).toEqual([
      { country: 'Czech Republic', currency: 'Koruna', amount: 1, code: 'CZK', rate: 23.5 },
      { country: 'USA', currency: 'Dollar', amount: 1, code: 'USD', rate: 22.5 },
    ])
  })

  it('should return an error when the fetch fails', async () => {
    const mockResponse = { ok: false, status: 500 }

    global.fetch = jest.fn().mockResolvedValue(mockResponse as Response)

    const [error, exchangeRates] = await getExchangeRates()

    expect(error).toEqual({ status: 500, message: '' })
    expect(exchangeRates).toBeUndefined()
  })
})
