import React from 'react'
import { Menu } from '../../lib/types'
import { MenuItem } from '../Pages/Notebook/MenuItem'
import { MenuSubItem } from '../Pages/Notebook/MenuSubItem'
import { useRouter } from 'next/router'

export const MenuCore: React.FC<{
  menu: Menu
}> = (props) => {
  const router = useRouter()
  return (
    <>
      <ul
        className={
          'menu bg-gray-50 fixed hidden lg:block lg:sticky top-16 w-64 overflow-auto border-r border-gray-200'
        }
      >
        {props.menu.items.map((x, i) => {
          return (
            <li key={`${i}.0`} className={'p-5 border-t border-gray-200'}>
              <MenuItem url={x.url} title={x.name} hasExpanded={x.subItems?.length > 0 && !x.url} />
              <ul className="hidden mt-4">
                {x.subItems?.map((y, j) => {
                  const active = router.asPath == y.url
                  return (
                    <li key={`${i}.${j}`} className="text-sm py-1 mt-2">
                      <MenuSubItem
                        title={y.name}
                        className={`${
                          active ? 'font-medium text-gray-900' : 'text-blue-600 hover:underline'
                        }`}
                        url={y.url}
                      />
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
      <style jsx>{`
        .menu {
          height: calc(100vh - 64px);
        }
      `}</style>
    </>
  )
}
