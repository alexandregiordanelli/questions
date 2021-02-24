import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from 'lib/firebase-client'
import cookie from 'js-cookie'
import { getClient } from 'services/client/get'
import { Customer } from '@prisma/client'

type Auth = {
  customerLogged: Customer
  user: firebase.User
  logout: () => Promise<void>
}

const authContext = createContext<Auth>({
  customerLogged: null,
  user: null,
  logout: firebase.auth().signOut,
})

const useProvideAuth = (): Auth => {
  const [customerLogged, setCustomerLogged] = useState<Customer>(null)
  const [user, setUser] = useState<firebase.User>(null)

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        setCustomerLogged(null)
        cookie.remove('token')
      } else {
        setUser(user)
        const token = await user.getIdToken()
        cookie.set('token', token)
        const customer = await getClient<Customer>('/api')
        if (customer) setCustomerLogged(customer)
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
    customerLogged,
    user,
    logout: firebase.auth().signOut,
  }
}

export const AuthProvider: React.FC = (props) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = (): Auth => useContext(authContext)
