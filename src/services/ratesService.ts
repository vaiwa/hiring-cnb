import { useQuery } from '@tanstack/react-query'
import * as firebaseService from './firebaseService' // adjust the import path as needed

export type ExchangeRate = {
  country: string
  currency: string
  amount: number
  code: string
  rate: number
}

type RatesResult = { data: ExchangeRate[] }

let ratesPromise: Promise<RatesResult> | null = null

export function init(): void {
  rates()
}

export async function rates() {
  if (!ratesPromise) {
    ratesPromise = (await firebaseService.fn('rates')()) as unknown as Promise<RatesResult> // TODO add tRPC to keep the types
  }
  return ratesPromise
}

export const useRate = () => {
  return useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const { data } = await rates()
      return data
    },
  })
}
