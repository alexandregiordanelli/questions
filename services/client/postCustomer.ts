import fetch from 'node-fetch'
import { urlEnv } from 'lib/utils'
import { Customer } from '@prisma/client'
export const postCustomer = async (_customer: Customer): Promise<Customer> => {
  const response = await fetch(`${urlEnv}/api/`, {
    method: 'POST',
    body: JSON.stringify(_customer),
    headers: { 'Content-Type': 'application/json' },
  })

  const customer: Customer = await response.json()
  return customer
}
