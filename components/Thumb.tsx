import { MediaWithUrl } from 'lib/types'
import { LinkIcon, CheckIcon, TrashIcon } from '@primer/octicons-react'

export const Thumb: React.FC<{
  media: MediaWithUrl
  getLink?: (a: string) => void
  select?: (id: number) => void
  onClick?: () => void
  remove?: () => void
}> = (props) => {
  return (
    <div
      className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 flex flex-col m-3 relative"
      key={props.media.tag}
    >
      <div className="absolute right-0 top-0 z-10 p-2">
        {props.getLink && (
          <button
            className="bg-gray-200 text-gray-700 p-1 text-xs rounded-sm"
            onClick={() => props.getLink(`${props.media.customerId}/${props.media.tag}`)}
          >
            <LinkIcon />
          </button>
        )}
        {props.select && (
          <button
            className="ml-2 bg-gray-200 text-gray-700 p-1 text-xs rounded-sm"
            onClick={() => props.select(props.media.id)}
          >
            <CheckIcon />
          </button>
        )}
        {props.onClick && (
          <button
            className="ml-2 bg-gray-200 text-gray-700 p-1 text-xs rounded-sm"
            onClick={() => props.onClick()}
          >
            <CheckIcon />
          </button>
        )}
        {props.remove && (
          <button
            className="ml-2 bg-gray-200 text-gray-700 p-1 text-xs rounded-sm"
            onClick={() => props.remove()}
          >
            <TrashIcon />
          </button>
        )}
      </div>
      <div className="bg-gray-800 flex-grow flex items-center justify-center">
        <img src={props.media.url} alt={props.media.name} />
      </div>
      <div className="flex items-baseline mt-2">
        <p className="text-xs font-medium truncate">{props.media.name}</p>
        <span className="uppercase bg-gray-100 text-xs text-gray-300 p-1 rounded">
          {props.media.mime}
        </span>
      </div>
      <p className="text-xs text-gray-300">{Math.round(props.media.size / 1024)} KB</p>
    </div>
  )
}
