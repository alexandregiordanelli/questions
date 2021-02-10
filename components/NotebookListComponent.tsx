import React from 'react'
import { CustomerWithNotebooks } from 'lib/types'
import { NotebookCard } from './NotebookCard'

export const NotebookListComponent: React.FC<{
  customer: CustomerWithNotebooks
}> = (props) => {
  return (
    <>
      <div
        className="flex overflow-x-auto shadow-inner bg-gray-100"
        // style={{ backgroundImage: `url("/graph-paper.svg")` }}
      >
        {props.customer?.notebooks.map((x, i) => (
          <NotebookCard notebook={x} key={i} customerTag={props.customer.tag} className="m-8" />
        ))}
      </div>
    </>
  )
}
