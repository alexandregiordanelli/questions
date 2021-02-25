import React, { Dispatch, SetStateAction } from 'react'
import { Customer } from '@prisma/client'

export const EditCustomer: React.FC<{
  state: Customer
  setState: Dispatch<SetStateAction<Customer>>
}> = (props) => {
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
                        tag
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(x) =>
                          props.setState({
                            ...props.state,
                            tag: x.target.value,
                          })
                        }
                        value={props.state.tag}
                      />
                      <span className="text-xs font-medium text-right block">
                        {props.state.tag && `questionsof.com/${props.state.tag}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
