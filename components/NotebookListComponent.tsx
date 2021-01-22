import React from 'react'
import Link from 'next/link'
import { Img } from './Img'
import { CustomerWithNotebooks } from 'lib/types'

export const NotebookListComponent: React.FC<{
  customer: CustomerWithNotebooks
}> = (props) => {
  return (
    <>
      <div className="p-8 bg-gray-200" style={{ backgroundImage: `url("/graph-paper.svg")` }}>
        <span className="font-semibold text-gray-400">Notebooks</span>
        <div className="flex overflow-x-auto">
          {props.customer.notebooks.map((x, i) => {
            //const imgSrc = fs.readFile(`${i}.jpg`)
            return (
              <div className="bg-white shadow-md mt-4 mr-4 rounded-md flex-none" key={i}>
                <div className="p-5">
                  <Img src={`/${i}.jpg`} height={200} width={200} />
                </div>
                <div className="bg-gray-50 p-5 rounded-b-md text-gray-500">
                  <h1 className="font-medium">{x.name}</h1>
                  <span className="">R${x.price}</span>
                  <div className="flex justify-end mt-5 rounded-b-lg">
                    <Link href={`${props.customer.username}/${x.tag}`}>
                      <a
                        className={
                          'bg-gray-500 text-white rounded-lg shadow-md px-4 py-2 font-semibold'
                        }
                      >
                        Demo
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
