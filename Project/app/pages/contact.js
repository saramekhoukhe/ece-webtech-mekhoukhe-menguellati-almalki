import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Layout from '../components/Layout.js'
import { useRouter } from 'next/router'

export default function Contact() {
  const supabase = useSupabaseClient()
  const [message, setMessage] = useState(null)
  const router = useRouter()
  const onSubmit = async function(e){
    e.preventDefault()
    const data = new FormData(e.target)
    const { error } = await supabase
      .from('contacts')
      .insert(Object.fromEntries(data), { returning: 'minimal' })
    if(error){
      setMessage(error.message)

    
    }else{
      setMessage(
        <div className="mt-3 text-sm text-center text-green-500">
          <h2 className="text-center mt-3">Confirmation</h2>
          <p>Thank you for contacting us. We will get back to you very soon.</p>
        </div>
      )
      router.push("/contact");
    }
    

  }
    
  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - contact us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          Contact
        </h1>
        <div className="text-center">
          <p className="text-lg">We are a here to help.</p>
        </div>

        <div className="contact">
          <div className="my-10">
            <form onSubmit={onSubmit}>
              <div className="mb-5">
                <input
                  id="Full name"
                  type="text"
                  placeholder="Full Name"
                  name="Full name"
                  autoComplete="false"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="false"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4"
                
                />
                
              </div>

              <div className="mb-3">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4"
                />
                
              </div>
              <button
                className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
                Send a message
              </button>
            </form>

            {message &&
              <div
                aria-label="Overlow below the drawer dialog"
                className="fixed inset-0 bg-black/80 flex items-center justify-center"
                onClick={() => setMessage(null)}
                role="dialog"
              >
                <div
                  aria-label="Alert pane"
                  className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white"
                >
                  {message}
                </div>
              </div>
            }
          </div>
        </div>
      </div>

    </Layout>
  )
}
