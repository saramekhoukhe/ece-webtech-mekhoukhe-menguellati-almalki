import Head from 'next/head'
import Layout from '../components/Layout.js'
import Link from 'next/link'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - about us</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
          <p className="text-lg">We are a small passionate team.</p>
        </div>


        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <p>
            We provide real-time connectivity to enable software
            providers and financial institutions to build integrated
            products for their small business customers.
          </p>
          <p>
            Our API infrastructure is leveraged by clients ranging
            from lenders to corporate card providers and business
            forecasting tools, with use cases including automatic
            reconciliation, business dashboarding, and loan
            decisioning.
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}
