import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from 'lib/firebase-client'
import cookie from 'js-cookie'
import { useData } from 'services/client/get'
import { ChosenAlternative, Customer, Media } from '@prisma/client'
import { mutate } from 'swr'

type Auth = {
  customer: Customer & { media: Media }
  stats: ChosenAlternative[]
  user: firebase.User
  logout: () => Promise<void>
}

const authContext = createContext<Auth>({
  customer: null,
  stats: null,
  user: null,
  logout: firebase.auth().signOut,
})

const useProvideAuth = (): Auth => {
  const [user, setUser] = useState<firebase.User>(null)
  const { data: customer } = useData<Customer & { media: Media }>(`/api`)
  const { data: stats } = useData<ChosenAlternative[]>(`/api/stats`)

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        cookie.remove('token')
      } else {
        setUser(user)
        const token = await user.getIdToken()
        cookie.set('token', token)
      }
      mutate('/api')
      mutate('/api/stats')
    })
  }, [])

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
    customer,
    stats,
    user,
    logout: firebase.auth().signOut,
  }
}

export const AuthProvider: React.FC = (props) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = (): Auth => useContext(authContext)
