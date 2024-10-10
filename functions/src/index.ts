/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import { getExchangeRates } from './rates/rates'

const REGION = ['europe-west3'] // Frankfurt
const CORS = ['https://hiring-cnb.web.app', 'http://localhost:5173']
const TIMEOUT = 30 // seconds
const CONFIG = { region: REGION, cors: CORS, timeoutSeconds: TIMEOUT }

// const onRequest = functions.region(REGION).https.onRequest

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const rates = onRequest(CONFIG, async (_request, response) => {
  logger.info('FN CALL: rates', { structuredData: true })

  const [error, data] = await getExchangeRates()
  if (error) {
    response.status(error.status).send({ error: 'Failed to fetch data from CNB' })
    return
  }
  response.send({ data })
})
