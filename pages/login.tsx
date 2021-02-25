import { NextPage } from 'next'
import firebase from 'lib/firebase-client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const signInSuccessUrl = (router.query?.url as string) ?? '/'

  useEffect(() => {
    import('firebaseui').then((firebaseui) => {
      const config = {
        signInSuccessUrl,
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
            // Google provider must be enabled in Firebase Console to support one-tap
            // sign-up.
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // Required to enable ID token credentials for this provider.
            // This can be obtained from the Credentials page of the Google APIs
            // console. Use the same OAuth client ID used for the Google provider
            // configured with GCIP or Firebase Auth.
            clientId: '872190920136-g962c5dhq2qctc3cj1hq8sdo3atqlpq5.apps.googleusercontent.com',
          },
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          // firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '',
        // Privacy policy url/callback.
        privacyPolicyUrl: '',
      }
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', config)
      //ui.disableAutoSignIn()
    })
  }, [signInSuccessUrl])

  return (
    <>
      <style jsx global>{`
        .firebaseui-idp-text-short {
          @apply hidden;
        }
      `}</style>
      <div id="firebaseui-auth-container"></div>
    </>
  )
}

export default Page
