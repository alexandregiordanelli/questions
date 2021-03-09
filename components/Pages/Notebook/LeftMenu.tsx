import { ThreeBarsIcon } from '@primer/octicons-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MenuWithQuestions } from '../../../lib/types'
import { MenuCore } from './MenuCore'

export const LeftMenu: React.FC<{
  menu: MenuWithQuestions
  notebookTag: string
  customerTag: string
}> = (props) => {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    setToggleMenu(false)
  }, [router.asPath])

  return (
    <div className="z-10">
      <label
        htmlFor="leftMenu"
        className="fixed lg:hidden cursor-pointer leading-5 rounded-md text-sm left-3 top-5 text-white"
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
      <MenuCore menu={props.menu} notebookTag={props.notebookTag} customerTag={props.customerTag} />
    </div>
  )
}
