import { supabase } from 'lib/supabase-client'
import { GoogleIcon } from './GoogleIcon'

export const Login: React.FC = () => {
  const login = async (): Promise<void> => {
    const { user, error } = await supabase.auth.signIn({
      provider: 'google',
    })
    console.log(user)
    console.log(error)
  }

  return (
    <button onClick={login} className="text-white text-sm flex items-center">
      <div className="w-4 mr-2">
        <GoogleIcon />
      </div>
      Sign In
    </button>
  )
}
