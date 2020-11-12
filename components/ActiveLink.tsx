import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'
import { useAmp } from 'next/amp'
import { ampUrl } from '../lib/utils'

const ActiveLink: React.FC<{
    activeClassName?: string
    href: string
}> = props => {
  const router = useRouter()
  const isAmp = useAmp()
  const child = Children.only(props.children) as React.ReactElement
  const childClassName: string = child.props.className ?? ""
  const slugJoined = `/${(router.query.slug as string[]).join('/')}`
  const className = props.href === slugJoined ? `${childClassName} ${props.activeClassName ?? "active"}`.trim() : childClassName

  return (
    <Link href={ampUrl(isAmp, props.href)}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink