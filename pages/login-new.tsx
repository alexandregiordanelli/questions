import { NextPage } from 'next'
import firebase from 'lib/firebase-client'
import { useEffect } from 'react'

const Page: NextPage = () => {
  useEffect(() => {
    import('firebaseui').then((firebaseui) => {
      const config = {
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          // firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '',
        // Privacy policy url/callback.
        privacyPolicyUrl: '',
      }
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', config)
    })
  }, [])

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
