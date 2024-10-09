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

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const hello = onRequest((_request, response) => {
  logger.info('FN CALL: hello', { structuredData: true })
  response.send('Hello!')
})

export const rates = onRequest(async (_request, response) => {
  logger.info('FN CALL: rates', { structuredData: true })

  const [error, data] = await getExchangeRates()
  if (error) {
    response.status(error.status).send({ error: 'Failed to fetch data from CNB' })
    return
  }
  response.send({ data })
})
