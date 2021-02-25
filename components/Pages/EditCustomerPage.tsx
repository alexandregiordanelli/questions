import { useRouter } from 'next/router'
import { useData } from 'services/client/get'
import { useEffect, useState } from 'react'

import NProgress from 'nprogress'
import { postClient } from 'services/client/post'
import { mutate } from 'swr'
import { HeaderAdmin } from 'pages/admin/profile'
import { Customer } from '@prisma/client'
import { EditCustomer } from 'components/EditCustomer'

const initState: Customer = {
  id: 0,
  userId: '',
  tag: '',
  createdAt: null,
  updatedAt: null,
  mediaId: 0,
  name: '',
  text: '',
}

export const EditCustomerPage: React.FC<{
  customerTag?: string
}> = (props) => {
  const { data: customer } = useData<Customer>(
    props.customerTag ? `/api/${props.customerTag}` : null,
    null
  )

  const initCustomer = customer ? customer : initState

  const router = useRouter()

  const [state, setState] = useState(initCustomer)

  useEffect(() => {
    setState(initCustomer)
  }, [initCustomer])

  const postCustomer = async (_customer: Customer): Promise<void> => {
    try {
      NProgress.start()
      const customer = await postClient<Customer>(_customer, `/api`)
      mutate(`/api/${customer.tag}`, customer)
      router.push(`/admin`)
    } catch (e) {
      NProgress.done()
      console.log(e)
    }
  }

  return (
    <>
      <HeaderAdmin>
        <button
          onClick={async () => await postCustomer(state)}
          className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </HeaderAdmin>

      <div className="p-20">
        <EditCustomer state={state} setState={setState} />
      </div>
    </>
  )
}
