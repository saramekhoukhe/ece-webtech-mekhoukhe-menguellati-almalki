import { useContext,useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase'
import UserContext from '../../components/UserContext'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { parseISO, format } from "date-fns"
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Article({
  article
}) {
  const { user, logout} = useContext(UserContext)
  const [profile, setProfile] = useState('');
  let comments = []
  if (article) comments = article[0]['comment']
  const [message, setMessage] = useState(null)
  const [text, setText] = useState('');
  const router = useRouter()
  const onSubmit = async function(e){
    e.preventDefault()
    const data = new FormData(e.target)
    const { error } = await supabase
      .from('comment')
      .insert(Object.fromEntries(data), { returning: 'minimal' })
    if(error){
      setMessage(error.message)
    }else{
      setMessage(
        <div>
          <h2 className="text-center mt-3">Confirmation</h2>
          <p>Success!</p>
        </div>
      )
    }
    setText('')
    router.push("/articles/"+Object.fromEntries(data)['article_id']);
    
  }
  
  const onClickDelete = async function(id_comment, article_id){
    const { error } = await supabase
      .from('comment')
      .delete()
      .eq('id_comment', id_comment)
    if(error){
      setMessage(error.message)
    }else{
      setMessage(
        <div>
          <h2 className="text-center mt-3">Confirmation</h2>
          <p>Success!</p>
        </div>
      )
      router.push("/articles/"+article_id)
    }
    
  }
  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - Article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-md mx-auto ">
          
          <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
            {article[0].title}
          </h1>

          <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={
                      article[0].created_at
                    }>
                    {format(
                        parseISO(
                          article[0].created_at
                        ),
                        "MMMM dd, yyyy"
                      )}
                  </time>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div>
        <article className="max-w-screen-md mx-auto ">
          <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
            {article[0].text}
          </div>
          <div className="flex justify-center mt-7 mb-7">
            <Link href="/articles" className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
              ← View all articles
            </Link>
          </div>
        </article>
      </div>
      <div className="max-w-screen-md mx-auto ">
        <form onSubmit={onSubmit}>
           <input
                type="text"
                name="article_id"
                className="hidden"
                style={{ display: "none" }}
                value={article[0]?.id} readOnly>
          </input>
          <input
                type="text"
                name="user_id"
                className="hidden"
                style={{ display: "none" }}
                value={user?.id} readOnly>
          </input>
          <textarea
            className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500"
            rows={2}
            placeholder={
              user
                ? `What are your thoughts?`
                : 'Please login to leave a comment'
            }
            disabled={!user}
            name = "text"
            id="text"
            onChange={event => setText(event.target.value)}
            value={text}
          
          />

          <div className="flex items-center mt-4">
            {user ? (
              <div className="flex items-center space-x-6">
                <button className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700">
                  Send
                </button>
              </div>
            ) : (
              <Link
                type="button"
                className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
                href="/login"
              >
                Log In
              </Link>
            )}
          </div>
        </form>

        {comments.map(comment => (
          <div className="card flex space-x-4" key={comment.id}>
            <div className="flex-shrink-0">
              {comment.profiles.avatar_url? (
                    <Image
                      src={comment.profiles.avatar_url}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" 
                       className="h-24 w-24" 
                       viewBox="0 0 40 40" 
                       fill="currentColor">  
                      <path fillRule="evenodd" 
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                            clipRule="evenodd" />
                    </svg>
              )}
              
            </div>

            <div className="flex-grow">
              <div className="flex space-x-2">
                <b>{comment.profiles.user_name }</b>
                <time className="text-gray-400"
                  dateTime={
                    comment.created_at
                  }>
                  {format(
                    parseISO(
                      comment.created_at
                    ),
                    "MMMM dd, yyyy"
                  )}
                </time>
                
              </div>
              {comment.user_id == user?.id ? (
                <button
                  className="text-gray-400 hover:text-red-500 flex space-x-0 button-supp"
                  aria-label="Close"
                  onClick={() => onClickDelete(comment.id_comment, article[0]?.id)}
                >
                  x
                </button>
              ) : (
                <button
                  className="hidden text-gray-400 hover:text-red-500 flex space-x-0 button-supp"
                  aria-label="Close"
                  onClick={() => onClickDelete(comment.id_comment, article[0]?.id)}
                >
                  x
                </button>
              )}
              
              <div>{comment.text}</div>
            </div>
          </div>
        ))}
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
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  let article = []
  let { data, error, status } = await supabase
    .from('article')
    .select(`
      id,
      title,
      text,
      created_at,
      comment(
        id_comment,
        text,
        created_at,
        user_id,
        profiles(
          user_name,
          avatar_url
        )
      )
    `)
    .eq('id', ctx.params.id)
  if (!error) article = data // handle errors
  return {
    props: {
      article: article,

    }
  };
}


export async function getStaticPaths(ctx) {
  let articles = []
  let { data, error, status } = await supabase
    .from('article')
    .select(`id`)
  if (!error) articles = data // handle errors
  return {
    paths: articles.map( article => `/articles/${article.id}`),
    fallback: false
  };
}