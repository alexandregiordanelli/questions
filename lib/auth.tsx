import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from 'lib/firebase-client'
import cookie from 'js-cookie'
import { useData } from 'services/client/get'
import { ChosenAlternative, Customer, Media } from '@prisma/client'
import { mutate } from 'swr'
import { MyNotebooks } from './types'

type Auth = {
  showNotebookCard: boolean
  setShowNotebookCard: React.Dispatch<React.SetStateAction<boolean>>
  showFocusOnLogin: boolean
  setShowFocusOnLogin: React.Dispatch<React.SetStateAction<boolean>>
  customer: Customer & { media: Media }
  stats: ChosenAlternative[]
  subscribers: MyNotebooks
  user: firebase.User
  logout: () => Promise<void>
}

const authContext = createContext<Auth>({
  showNotebookCard: false,
  setShowNotebookCard: null,
  showFocusOnLogin: false,
  setShowFocusOnLogin: null,
  customer: null,
  stats: null,
  subscribers: null,
  user: null,
  logout: null,
})

const useProvideAuth = (): Auth => {
  const [user, setUser] = useState<firebase.User>(null)
  const { data: customer } = useData<Customer & { media: Media }>(`/api`)
  const { data: stats } = useData<ChosenAlternative[]>(customer ? `/api/stats` : null)
  const { data: subscribers } = useData<MyNotebooks>(customer ? `/api/subscribers` : null)
  const [showFocusOnLogin, setShowFocusOnLogin] = useState(false)
  const [showNotebookCard, setShowNotebookCard] = useState(false)

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        setShowNotebookCard(false)
        cookie.remove('token')
        mutate('/api', null, false)
        mutate('/api/stats', null, false)
        mutate('/api/subscribers', null, false)
      } else {
        setShowFocusOnLogin(false)
        setUser(user)
        mutate('/api')
        mutate('/api/stats')
        mutate('/api/subscribers')
        const token = await user.getIdToken()
        cookie.set('token', token)
      }
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
    showNotebookCard,
    setShowNotebookCard,
    showFocusOnLogin,
    setShowFocusOnLogin,
    customer,
    stats,
    subscribers,
    user,
    logout: firebase.auth().signOut,
  }
}

export const AuthProvider: React.FC = (props) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = (): Auth => useContext(authContext)
