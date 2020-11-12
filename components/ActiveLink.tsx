import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'
import { useAmp } from 'next/amp'
import { ampUrl } from '../lib/utils'

const ActiveLink: React.FC<{
    activeClassName?: string
    href: string
}> = props => {
  const { asPath } = useRouter()
  const isAmp = useAmp()
  const child = Children.only(props.children) as React.ReactElement
  const childClassName: string = child.props.className ?? ""
  
  const className = props.href === asPath ? `${childClassName} ${props.activeClassName ?? "active"}`.trim() : childClassName

  return (
    <Link href={ampUrl(isAmp, props.href)}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink