import { postCustomer } from 'services/client/postCustomer'

test('postCustomer - create a customer with corrects object', async () => {
  const customer = await postCustomer({
    id: 0,
    userId: '',
    username: 'casa',
  })

  expect(customer).toMatchObject({
    id: 0,
    userId: '',
    username: 'casa',
  })
})
