import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { Inter } from '@next/font/google'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="center">
          <Image
            className="logo"
            src="/logo.png"
            width={587}
            height={300}
            priority
            alt="logo"
          />
        </div>

        <div className="grid-index">
          <Link
            href="/articles"
            className="card"
          >
            <h2 className={inter.className}>
              Articles <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-all articles.
            </p>
          </Link>

          <Link
            href="/about"
            className="card"
          >
            <h2 className={inter.className}>
              About <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about us.
            </p>
          </Link>

          <Link
            href="/contact"
            className="card"
          >
            <h2 className={inter.className}>
              Contact <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              To contact us click here.
            </p>
          </Link>
        </div>
      </main>
    </Layout>
  )
}