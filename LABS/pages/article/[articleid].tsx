import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from "../header"
import Footer from "../footer"

const Article = (req, res) => {
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
  const router = useRouter()
  const { articleid } = router.query
  const result = array.filter( article => article.id === articleid)
  console.log({ articleid });


  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Article search page!</a>
        </h1>

        <p className={styles.description}>
          You searched this article: {articleid}
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default Article
