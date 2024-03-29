import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout.js'
import UserContext from '../components/UserContext'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession} from '@supabase/auth-helpers-react'
import { parseISO, format } from "date-fns"
import Image from 'next/image'

export default function Contact() {
  const { user, logout, loading_ } = useContext(UserContext)
  const supabase = useSupabaseClient()
  const router = useRouter()
  
  useEffect(() => {
    if (!(user || loading_)) {
      router.push('/login')
    }
  }, [user, loading_, router])
  const onClickLogout = function() {
    logout()
  }
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [user_name, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [first_name, setFirstname] = useState(null)
  const [last_name, setLastname] = useState(null)
  const [phone, setPhone] = useState(null)
  const [update_at, setUpdateAt] = useState(null)
  
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`user_name, website, avatar_url, phone, first_name, last_name, update_at`)
        .eq('id', session?.user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.user_name)
        setFirstname(data.first_name)
        setLastname(data.last_name)
        setPhone(data.phone)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setUpdateAt(data.update_at.slice(0,10))
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { !(user || loading) ?
        <p>Redirecting...</p>
        :
        <>
        <div >
          <div className="p-8 bg-white shadow mt-24">  
            <div className="grid grid-cols-1 md:grid-cols-3">    
              
              <div className="relative">      
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  {avatar_url ? (
                    <Image
                      src={avatar_url}
                      alt="Avatar"
                      className="h-24 w-24"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" 
                       className="h-24 w-24" 
                       viewBox="0 0 20 20" 
                       fill="currentColor">  
                      <path fillRule="evenodd" 
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                            clipRule="evenodd" />
                    </svg>
                  )}
                          
                </div>    
              </div>    
              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center button-supp">
                <Link  className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                       href="/profile/update"
                >  
                  Update
                </Link>    
                <button  className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                         onClick={onClickLogout}
                >  
                  Logout
                </button>    
              </div>  
            </div>  
            <div className="mt-20 text-center border-b pb-12">    
              <h1 className="text-4xl font-medium text-gray-700">
                {last_name} {first_name}
              </h1>    
              <p className="font-light text-gray-600 mt-3">{user_name}</p>    
              <p className="mt-8 text-gray-500">{user?.email}</p>    
              <p className="mt-2 text-gray-500">{website} | {phone}</p>
              <p className="mt-2 text-gray-500">Last update : {update_at}
                
              </p>  
            </div>  
          </div>
        </div>
        </>
      }
    </Layout>
  )
}
