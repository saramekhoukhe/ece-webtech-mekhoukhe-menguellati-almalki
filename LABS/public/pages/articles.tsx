import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "./header"
import Footer from "./footer"

export default function Articles() {
  const array =[
    {
      id: '1',
      title: 'My article 1',
      content: 'Content of the article 1.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '2',
      title: 'My article 2',
      content: 'Content of the article 2.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '3',
      title: 'My article 3',
      content: 'Content of the article 3.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '4',
      title: 'My article 4',
      content: 'Content of the article 4.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '5',
      title: 'My article 5',
      content: 'Content of the article 5.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '6',
      title: 'My article 6',
      content: 'Content of the article 6.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    }
  ];
  const articles =[];
  for (let i =0 ; i < array.length; i++){
    articles.push(
    <a className={styles.card}>
      <h2>{array[i]['title']}</h2>
      <p>{array[i]['content']}</p>
      <h3>{array[i]['author']}</h3>
      <code className={styles.code}>{array[i]['date']}</code>
    </a>);
  }
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Articles page!</a>
        </h1>

        <p className={styles.description}>
          This is the articles page.
        </p>

        <div className={styles.grid}>
          {articles}
        </div>
      </main>

      <Footer />
    </div>
  )
}
