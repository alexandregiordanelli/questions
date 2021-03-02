import { ThreeBarsIcon } from '@primer/octicons-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Menu } from '../../lib/types'
import { MenuCore } from './MenuCore'

export const LeftMenu: React.FC<{
  menu: Menu
}> = (props) => {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    setToggleMenu(false)
  }, [router.asPath])

  return (
    <>
      <label
        htmlFor="leftMenu"
        className="z-50 fixed lg:hidden cursor-pointer leading-5 rounded-md text-sm left-3 top-5 text-white"
      >
        <ThreeBarsIcon />
      </label>
      <input
        id="leftMenu"
        className="toggleVisibilityUL"
        type="checkbox"
        onChange={(x) => setToggleMenu(x.target.checked)}
        checked={toggleMenu}
      />
      <MenuCore menu={props.menu} />
    </>
  )
}
