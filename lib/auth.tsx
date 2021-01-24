import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from 'lib/firebase-client'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'

type Auth = {
  user: firebase.User
  logout: () => Promise<void>
}

const authContext = createContext<Auth>({ user: null, logout: firebase.auth().signOut })

const useProvideAuth = (): Auth => {
  const [user, setUser] = useState<firebase.User>(null)
  const router = useRouter()

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        cookie.remove('token')
      } else {
        const token = await user.getIdToken()
        setUser(user)
        cookie.set('token', token)
      }
    })
  }, [])

  useEffect(() => {
    const cameFromEmail = firebase.auth().isSignInWithEmailLink(window.location.href)
    if (cameFromEmail && !cookie.get('token')) {
      let email = cookie.get('email')
      if (!email) {
        email = window.prompt('Please provide your email for confirmation')
        email && cookie.set('email', email)
      }
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(() => {
          cookie.remove('email')
          router.replace(window.location.href.split('?')[0])
        })
    } else if (cameFromEmail && cookie.get('token')) {
      router.replace(window.location.href.split('?')[0])
    }
  }, [router])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`)
      const user = firebase.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
  }, [])

  return {
    user,
    logout: firebase.auth().signOut,
  }
}

export const AuthProvider: React.FC = (props) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = (): Auth => useContext(authContext)
