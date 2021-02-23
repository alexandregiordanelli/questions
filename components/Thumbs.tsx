import { MediaWithUrl } from 'lib/types'

export const Thumbs: React.FC<{
  medias: MediaWithUrl[]
}> = (props) => {
  const thumbs = props.medias?.map((media) => {
    return (
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 flex flex-col m-3" key={media.tag}>
        <div className="bg-gray-800 flex-grow flex items-center justify-center">
          <img src={media.url} alt={media.name} />
        </div>
        <div className="flex items-baseline mt-2">
          <p className="text-xs font-medium truncate">{media.name}</p>
          <span className="uppercase bg-gray-100 text-xs text-gray-300 p-1 rounded">
            {media.mime}
          </span>
        </div>
        <p className="text-xs text-gray-300">{Math.round(media.size / 1024)} KB</p>
      </div>
    )
  })

  return <aside className="flex flex-wrap">{thumbs}</aside>
}
