import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { supabase } from './api/supabase'
import { parseISO, format } from "date-fns"

export default function Articles({
  articles
}) {
  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - Articles</title>
        <meta name="description" content="WebTech articles page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="grid gap-10 lg:gap-10 md:grid-cols-2">
          {articles.slice(0,2).map(post => (
            <div className="cursor-pointer link-effect" key={post.id}>
              <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
                <Link href={`/articles/${post.id}`}>
                  <span className="link-underline link-underline-blue">
                    {post.title}
                  </span>
                </Link>
              </h2>

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
          ))}
        </div>

        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {articles.slice(2).map(post => (
            <div className="cursor-pointer link-effect" key={post.id}>
              <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
                <Link href={`/articles/${post.id}`}>
                  <span className="link-underline link-underline-blue">
                    {post.title}
                  </span>
                </Link>
              </h2>

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
          ))}
        </div>
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  let articles = []
  let { data, error, status } = await supabase.from('article').select(`id, created_at, text, title`)
  if (!error) articles = data // handle errors
  return {
    props: {
      articles: articles
    }
  };
}
