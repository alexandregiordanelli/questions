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
      <label
        htmlFor={encodeURIComponent(props.title)}
        className="flex justify-start cursor-pointer items-center"
      >
        <ChevronDownIcon className="mr-2" />
        <span className=" ">{props.title}</span>
        <span className="ml-auto justify-self-end text-xs font-light">{props.count}</span>
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
