import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { supabase } from './api/supabase'
import { parseISO, format } from "date-fns"
import { FiEdit } from 'react-icons/fi'
import { FaTrash, FaFileSignature } from 'react-icons/fa'
import { useContext } from 'react'
import { useState,useEffect } from 'react'
import UserContext from '../components/UserContext'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'

export default function MyArticles({
  user, articles
}) {
  const [message, setMessage] = useState(null)
  const router = useRouter()
  const onClickDelete = async function(article_id){
    const { error } = await supabase
      .from('article')
      .delete()
      .eq('id', article_id)
    if(error){
      setMessage('Sorry, an unexpected error occured.')
    }else{
      setMessage(
        <div>
          <h2 className="text-center mt-3">Confirmation</h2>
          <p>Success!</p>
        </div>
      )
    }
    router.push("/myarticles")
  }
  const style = { fontSize: "1.5em" }

  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - My articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div class="flex flex-col space-y-4 ">
        <div className="float-right">
          <Link href={`/articles/create`} className="flex space-x-2 content-center float-right">
            <FaFileSignature style={style}/><h3>Add article </h3>
          </Link>

        </div>
        <div className='grid-liste'>
          {articles.map(post => (
              <div className='card' key={post.id}>
                <div className='element-titre' >
                  <Link href={`/articles/${post.id}`}>
                    <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
                      {post.title}
                    </h2>
                  </Link>
                    

                  <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
                    <span className="text-xs text-gray-300 dark:text-gray-600">
                      &bull;
                    </span>
                    <time
                      className="text-sm"
                      dateTime={post.created_at}>
                      {format(
                        parseISO(post.created_at),
                        "MMMM dd, yyyy"
                      )}
                    </time>
                  </div>
                </div>
                <div className='element-supp'>
                  <Link href={`/articles/edit/${post.id}`}>
                    <FiEdit />
                  </Link>

                  <button onClick={() => onClickDelete(post.id)}><FaTrash /></button>
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
          ))}
        </div>
      </div>
        

        
    </Layout>
  )
}
export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  let articles = []
  let { data, error, status } = await supabase.from('article').select(`id, created_at, text, title`).eq('user_id', session.user.id)
  if (!error) articles = data // handle errors

  return {
    props: {
      initialSession: session,
      user: session.user,
      articles:articles
    },
  }
}
