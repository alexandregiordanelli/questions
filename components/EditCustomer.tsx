import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { Customer } from '@prisma/client'
import { postClient } from 'services/client/post'
import { mutate } from 'swr'

export const EditCustomer: React.FC<{
  customer?: Customer
}> = (props) => {
  const initCustomer: Customer = {
    id: 0,
    userId: '',
    username: '',
  }

  const [customer, setCustomer] = useState(props.customer ?? initCustomer)
  const router = useRouter()

  useEffect(() => {
    setCustomer(props.customer)
  }, [props.customer])

  const postCustomer = async (_customer: Customer): Promise<void> => {
    try {
      NProgress.start()
      const customer = await postClient<Customer>(_customer, `/api`)
      mutate(`/api/${customer.username}`, customer)
      router.push(`/${customer.username}`)
    } catch (e) {
      NProgress.done()
      console.log(e)
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-6 sm:col-span-2 ">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(x) =>
                          setCustomer({
                            ...customer,
                            username: x.target.value,
                          })
                        }
                        value={customer.username}
                      />
                      <span className="text-xs font-medium text-right block">
                        {customer.username && `questionsof.com/${customer.username}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={async () => await postCustomer(customer)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
