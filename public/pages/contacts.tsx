import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "./header"
import Footer from "./footer"

export default function Contacts() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Contacts page!</a>
        </h1>

        <p className={styles.description}>
          This is the Contacts page.
        </p>
        <div className={styles.grid}>
        <form
          method="POST"
          target="_blank"
          >
          <div  className={styles.formgroup}>
            <label for="name">Name:</label>
            <input className={styles.formcontrol} type="text" placeholder="Your name" name="name" required />
          </div>
          <div  className={styles.formgroup}>
            <label for="email">Email:</label>
            <input className={styles.formcontrol} type="email" placeholder="Email" name="email" required />
          </div>
          <div className={styles.formgroup}>
            <label for="message">Message:</label>
            <textarea className={styles.formcontrol} placeholder="Your message" name="message" required />
          </div>
          <div>
            <button className={styles.btndefault} type="submit"> Send a message </button>
          </div>
         </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
