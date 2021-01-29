import { Controlled as CodeMirror } from 'react-codemirror2'

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/gfm/gfm')
}
import 'codemirror/lib/codemirror.css'

export const Editor: React.FC<{
  onChange: (value: string) => void
  value: string
  className?: string
}> = (props) => (
  <CodeMirror
    className={`text-xs shadow-sm border-gray-300 rounded-md border p-1 ${props.className ?? ''}`}
    options={{
      mode: 'gfm',
      lineNumbers: true,
      lineWrapping: true,
    }}
    value={props.value}
    onBeforeChange={(_editor, _data, value) => {
      props.onChange(value)
    }}
  />
)
