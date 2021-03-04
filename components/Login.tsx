import firebase from 'lib/firebase-client'
import { useEffect } from 'react'
export const Login: React.FC<{
  className?: string
}> = (props) => {
  useEffect(() => {
    let ui: firebaseui.auth.AuthUI = null
    import('firebaseui').then((firebaseui) => {
      const config = {
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
        signInFlow: 'popup',
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            clientId: '872190920136-g962c5dhq2qctc3cj1hq8sdo3atqlpq5.apps.googleusercontent.com',
          },
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        tosUrl: '',
        privacyPolicyUrl: '',
      }
      ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', config)
      ui.disableAutoSignIn()
    })

    return () => {
      ui && ui.delete()
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .firebaseui-idp-button {
          @apply flex px-2 py-1 shadow items-center;
        }
        .firebaseui-idp-text-short {
          @apply hidden;
        }
        .firebaseui-idp-text-long {
          @apply text-sm text-gray-900 font-medium;
        }
        .firebaseui-idp-icon {
          @apply h-4 mr-2;
        }
      `}</style>
      <div id="firebaseui-auth-container" className={props.className} />
    </>
  )
}
