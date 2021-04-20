import { supabase } from 'lib/supabase-client'

export const Login: React.FC = () => {
  const login = async (): Promise<void> => {
    const { user, error } = await supabase.auth.signIn({
      provider: 'google',
    })
    console.log(user)
    console.log(error)
  }

  return <button onClick={login}>Google</button>
}
