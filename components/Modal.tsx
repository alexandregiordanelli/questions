import { SetStateAction } from 'react'

export const Modal: React.FC<{
  showModal: (value: SetStateAction<boolean>) => void
}> = (props) => {
  return (
    <div className={`fixed z-20 inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen text-center">
        <div
          className={`fixed inset-0 transition-opacity`}
          aria-hidden="true"
          onClick={() => props.showModal(false)}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block align-middle h-screen" aria-hidden="true">
          &#8203;
        </span>
        {/* sm:max-w-4xl sm:w-full */}
        <div
          className={`inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all align-middle `}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}
