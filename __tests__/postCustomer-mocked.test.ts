jest.mock('node-fetch')

import fetch from 'node-fetch'
import { postCustomer } from 'services/client/postCustomer'
const { Response } = jest.requireActual('node-fetch')

test('postCustomer (mocked) - create a customer with corrects object', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  fetch.mockReturnValue(
    Promise.resolve(
      new Response(
        JSON.stringify({
          id: 0,
          userId: 0,
          username: '',
        })
      )
    )
  )

  const customer = await postCustomer({
    id: 0,
    userId: '',
    username: '',
  })

  expect(fetch).toHaveBeenCalledTimes(1)

  expect(customer).toMatchObject({
    id: 0,
    userId: 0,
    username: '',
  })
})
