import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink: React.FC<{
    activeClassName?: string
    as?: string
    href: string
}> = props => {
  let { asPath } = useRouter()
  const child = Children.only(props.children) as React.ReactElement
  const childClassName: string = child.props.className ?? ""

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  asPath = asPath.split("?")[0]
  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${props.activeClassName ?? "active"}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink