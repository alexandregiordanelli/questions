import { ChevronDownIcon } from '@primer/octicons-react'
import React, { useState } from 'react'
import { MenuSubItem } from './MenuSubItem'

export const MenuItem: React.FC<{
  count: number
  title: string
  url?: string
}> = (props) => {
  const [opened, toggleOpened] = useState(false)
  // const router = useRouter();

  // useEffect(() => {
  //     toggleOpened(false);
  // }, [router.asPath]);

  return props.count ? (
    <>
      <label htmlFor={encodeURIComponent(props.title)} className="flex flex-col cursor-pointer">
        <div className="flex justify-start items-center ">
          <ChevronDownIcon className="mr-2" />
          <span className="">{props.title}</span>
          <span className="ml-auto justify-self-end text-xs font-light">{props.count}</span>
        </div>
        <div className="bg-gray-400 h-1 rounded flex mt-2 overflow-hidden">
          <div style={{ width: '30%' }} className="bg-green-400"></div>
          <div style={{ width: '30%' }} className="bg-red-400"></div>
        </div>
      </label>

      <input
        id={encodeURIComponent(props.title)}
        className="toggleVisibilityUL"
        type="checkbox"
        onChange={(x) => toggleOpened(x.target.checked)}
        checked={opened}
      />
    </>
  ) : (
    <MenuSubItem title={props.title} url={props.url} />
  )
}
