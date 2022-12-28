import Head from 'next/head'
import Layout from '../../components/Layout.js'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Account() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [user_name, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [first_name, setFirstname] = useState(null)
  const [last_name, setLastname] = useState(null)
  const [phone, setPhone] = useState(null)
  const router = useRouter()
  
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`user_name, website, avatar_url, phone, first_name, last_name`)
        .eq('id', user?.id)
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
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (avatar_url) downloadImage(avatar_url)
  }, [avatar_url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const avatar_url = URL.createObjectURL(data)
      setAvatarUrl(avatar_url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
        console.log(uploadError.message)
      }

      setAvatarUrl(filePath)
    } catch (error) {
      console.log(error.message)
    } finally {
      setUploading(false)
    }
  }
  async function updateProfile({ user_name,first_name, last_name,phone ,website, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user?.id,
        user_name,
        website,
        avatar_url,
        first_name,
        last_name,
        phone,
        update_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
      router.push('/profile')

    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Update profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="flex justify-center items-center bg-white">
            <div className="w-full p-8 my-4 md:px-12 mr-auto rounded-2xl shadow-2xl">
              <div className="flex">
                <h4 className="font-bold uppercase text-2xl">Update profile</h4>
              </div>
              <div className="mt-5">
                <input 
                      id="email" 
                      type="text" 
                      value={session?.user?.email}  
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      disabled
                />
              </div>
              <div className="mt-5">
                <input 
                      name="user_name" 
                      placeholder="User name" 
                      type ="text"
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      value={user_name || ''}
                      onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      name ="first_name" 
                      type="text" 
                      placeholder="First Name" 
                      value={first_name || ''}
                      onChange={(e) => setFirstname(e.target.value)}
                />
                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      name="last_name" 
                      type="text" 
                      placeholder="Last Name" 
                      value={last_name || ''}
                      onChange={(e) => setLastname(e.target.value)}
                />
                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      name="website" 
                      type="text" 
                      placeholder="Website" 
                      value={website || ''}
                      onChange={(e) => setWebsite(e.target.value)}
                />
                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      name="phone" 
                      type="text" 
                      placeholder="Phone" 
                      value={phone || ''}
                      onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="my-4">
                <input
                    type="file"
                    id="avatar_url"
                    name= "avatar_url"
                    accept="image/*"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder="Avatar"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    onUpload={(url) => {
                      setAvatarUrl(url)
                      updateProfile({ user_name,first_name,last_name,phone, website, avatar_url:url })
                    }}
                />
              </div>
              <div className="my-2 w-1/2 lg:w-1/4 button-supp">
                <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                            focus:outline-none focus:shadow-outline"
                        onClick={() => updateProfile({ user_name,first_name,last_name,phone, website, avatar_url })}
                  disabled={loading}
                >
                  {loading ? 'Loading ...' : 'Update'}
                </button>
              </div>
            </div>
          
        </div>
      </div>
    </Layout>
  )
}