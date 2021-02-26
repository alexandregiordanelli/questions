import React from 'react'
import Link from 'next/link'

export const MenuSubItem: React.FC<{
  className?: string
  title: string
  url?: string
}> = (props) => {
  if (props.url) {
    return (
      <Link href={props.url}>
        <a className={props.className}>{props.title}</a>
      </Link>
    )
  } else {
    return <span>{props.title}</span>
  }
}
