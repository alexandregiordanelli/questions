import fetch from 'node-fetch'
import { Customer } from '@prisma/client'
export const postCustomer = async (_customer: Customer): Promise<Customer> => {
  const response = await fetch(`/api/`, {
    method: 'POST',
    body: JSON.stringify(_customer),
    headers: { 'Content-Type': 'application/json' },
  })

  console.log(response)

  const customer: Customer = await response.json()
  return customer
}
