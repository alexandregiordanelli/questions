import React from 'react'
import { Logo } from './Logo'
import { postEmail } from 'services/client/postEmail'
//import firebase from 'lib/firebase-client'

const linearPositionEye = (x: number): number => {
  if (x < 40) return 92 - x * 0.3
  else if (x > -1) return 80
}

// firebase
//   .auth()
//   .sendSignInLinkToEmail(email, {
//     url: 'http://localhost:3000',
//     handleCodeInApp: true,
//   })
//   .then(() => {
//     // The link was successfully sent. Inform the user.
//     // Save the email locally so you don't need to ask the user for it again
//     // if they open the link on the same device.
//     window.localStorage.setItem('emailForSignIn', email)
//     // ...
//   })
//   .catch((error) => {
//     console.log(error)
//     // ...
//   })

const FormEmail: React.FC<{
  email: string
  cursorPosition?: number
}> = (props) => {
  return (
    <div className="w-screen h-screen bg-gray-800 pt-4">
      <form
        className="bg-white p-6 flex rounded-md items-center flex-col sm:absolute top-1/2 left-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-sm"
        onSubmit={async (e) => {
          e.preventDefault()
          console.log(props.email)
          await postEmail(props.email)
        }}
      >
        <div className="logo relative">
          <Logo
            size={200}
            color={!(props.cursorPosition > -1) ? 'rgba(31, 41, 55)' : 'rgba(156, 163, 175)'}
          />
          <div
            className={`absolute ${props.cursorPosition > -1 ? 'block' : 'hidden'}`}
            style={{ bottom: 98, right: linearPositionEye(props.cursorPosition ?? 0) }}
          >
            <svg width="9px" height="13px" viewBox="0 0 9 13">
              <ellipse fill="#000000" cx="4.5" cy="6.5" rx="4.5" ry="6.5"></ellipse>
            </svg>
          </div>
        </div>

        {props.children}
      </form>
    </div>
  )
}

export default FormEmail
