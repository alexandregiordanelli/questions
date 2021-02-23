import { MenuAdmin } from 'components/MenuAdmin'

export const TemplateAdmin: React.FC<{
  className?: string
}> = (props) => {
  return (
    <div className="h-screen flex">
      <div className="w-60 bg-gray-800">
        <MenuAdmin />
      </div>
      <div className={`flex-1 overflow-auto ${props.className ?? ''}`}>{props.children}</div>
    </div>
  )
}
