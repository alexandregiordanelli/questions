import { MediaWithUrl } from 'lib/types'
import { Thumb } from './Thumb'

export const Thumbs: React.FC<{
  medias: MediaWithUrl[]
  getLink?: (a: string) => void
  select?: (id: number) => void
}> = (props) => {
  const thumbs = props.medias?.map((media) => {
    return <Thumb key={media.tag} media={media} getLink={props.getLink} select={props.select} />
  })

  return <aside className="flex flex-wrap">{thumbs}</aside>
}
