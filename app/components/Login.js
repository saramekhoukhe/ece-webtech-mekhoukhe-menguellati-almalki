import { useContext } from 'react'
import { useRouter } from 'next/router'
import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon.js'
import UserContext from './UserContext'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession} from '@supabase/auth-helpers-react'

export default function LoggedIn(){
  const router = useRouter()
  const {user, logout} = useContext(UserContext)
  function onClick() {
    if (user)
      router.push('/profile')
    else
      router.push('/login')
  }
  const session = useSession()
  const supabase = useSupabaseClient()
  const user_ = useUser()
  const [user_name, setUsername] = useState(null)
  
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`user_name`)
        .eq('id', user_?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.user_name)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <button
      className="flex gap-2 [&_svg]:h-6 [&_svg]:w-6"
      onClick={onClick}
    >
      {user ?
        <>
          <OutlineUserCircleIcon />
            {user_name}
          </>
          :
          <>
          <OutlineUserCircleIcon />
          Login
        </>
      }
    </button>
  )
}
