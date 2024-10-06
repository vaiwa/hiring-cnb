import express from 'express'
import { join } from 'path'
import { getExchangeRates } from './services/cnb-service'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const FE_NAME = 'frontend'

const API = 'api'

const app = express()

const frontendPath = join(__dirname, '../../../..', FE_NAME)

app.use(express.static(frontendPath))

app.get(`/${API}`, (req, res) => {
  res.send({ message: 'Hello API' })
})

const cnbExchangeRates = 'cnb-exchange-rates' // TODO change to tRPC to keep the types
app.get(`/${API}/${cnbExchangeRates}`, async (req, res) => {
  console.info(`API Call: ${cnbExchangeRates}`)
  const [error, data] = await getExchangeRates()
  if (error) return res.status(error.status).send({ error: 'Failed to fetch data from CNB' })
  return res.send({ data })
})

app.get('*', (req, res) => {
  const indexPath = join(frontendPath, 'index.html')
  res.sendFile(indexPath)
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
