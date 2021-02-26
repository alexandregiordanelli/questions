import { ChevronDownIcon } from '@primer/octicons-react'
import React, { useState } from 'react'
import { MenuSubItem } from './MenuSubItem'

export const MenuItem: React.FC<{
  hasExpanded: boolean
  title: string
  url?: string
}> = (props) => {
  const [opened, toggleOpened] = useState(false)
  // const router = useRouter();

  // useEffect(() => {
  //     toggleOpened(false);
  // }, [router.asPath]);

  return props.hasExpanded ? (
    <>
      <label
        htmlFor={encodeURIComponent(props.title)}
        className="flex justify-between cursor-pointer items-center"
      >
        {props.title}
        <ChevronDownIcon />
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
