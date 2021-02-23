import { MenuAdmin } from 'components/MenuAdmin'
import { Header } from './Header'

export const TemplateAdmin: React.FC<{
  className?: string
}> = (props) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <div className="w-60 bg-gray-800">
          <MenuAdmin />
        </div>
        <div className={`flex-1 overflow-auto ${props.className ?? ''}`}>{props.children}</div>
      </div>
    </div>
  )
}
