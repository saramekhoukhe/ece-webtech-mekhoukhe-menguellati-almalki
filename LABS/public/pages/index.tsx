import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "./header"
import Footer from "./footer"

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Home page!</a>
        </h1>

        <p className={styles.description}>
          This is the home page.
        </p>
      </main>

      <Footer />
    </div>
  )
}
