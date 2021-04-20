import React, { useState, useEffect, useContext, createContext } from 'react'
import { supabase } from './supabase-client'
import { Session, User } from '@supabase/supabase-js'
import { Customer, Media, ChosenAlternative, MyNotebooks } from './types'

type Auth = {
  customer: Customer & { Media: Media }
  setCustomer: React.Dispatch<React.SetStateAction<Customer & { Media: Media }>>
  stats: ChosenAlternative[]
  setStats: React.Dispatch<React.SetStateAction<ChosenAlternative[]>>
  subscribers: MyNotebooks
  setSubscribers: React.Dispatch<React.SetStateAction<MyNotebooks>>
  user: User
  logout: () => Promise<{ error: Error }>
}

const authContext = createContext<Auth>({
  customer: null,
  setCustomer: null,
  stats: null,
  setStats: null,
  subscribers: null,
  setSubscribers: null,
  user: null,
  logout: null,
})

const useProvideAuth = (): Auth => {
  const [user, setUser] = useState<User>(null)
  const [, setSession] = useState<Session>(null)
  const [customer, setCustomer] = useState<Customer & { Media: Media }>(null)
  const [stats, setStats] = useState<ChosenAlternative[]>(null)
  const [subscribers, setSubscribers] = useState<MyNotebooks>(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      ;(async () => {
        const { data: customer } = await supabase
          .from<Customer>('Customer')
          .select('*')
          .eq('userId', user.id)
          .single()

        const { data: media } = await supabase
          .from<Media>('Media')
          .select('*')
          .eq('id', customer.mediaId)
          .single()

        const customerWithMedia = {
          ...customer,
          Media: media,
        }

        setCustomer(customerWithMedia)

        const { data: stats } = await supabase
          .from<ChosenAlternative>('ChosenAlternative')
          .select('*')
          .eq('customerId', customer.id)

        setStats(stats)
      })()
    }
  }, [user])

  return {
    customer,
    setCustomer,
    stats,
    setStats,
    subscribers,
    setSubscribers,
    user,
    logout: supabase.auth.signOut,
  }
}

export const AuthProvider: React.FC = (props) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = (): Auth => useContext(authContext)
