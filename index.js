const express = require('express')
const router = express.Router()
const app = express()

var bodyParser = require('body-parser')

let db = {
  articles: [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    // ...
  ],
  comments: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Bob McLaren'
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment. 2',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad',
      author: 'Bob McLaren'
    }
    
  ]
}

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/articles', (req, res) => {
  res.send(db.articles)
})
// define the about route
router.post('/articles', (req, res) => {

  db.articles.push(req.body)
  res.send(db.articles)
})
// define the home page route
router.get('/article', (req, res) => {
  const article = db.articles.find( article => article.id === req.query.articleId)
  if (article){
    res.send(article)
  } else {
    res.status(404).send('Article not found')
  }
})
router.get('/articles/comments', (req, res) => {
  const comments = []

  db.comments.forEach(comment => {
    if (comment.articleId === req.query.articleId) {
      comments.push(comment)
    }
  })

  if (comments.length > 0){
    res.send(comments)
  } else {
    res.status(404).send('Comments not found')
  }

})

router.post('/articles/comments', (req, res) => {
  db.comments.push(req.body)
  res.send(db.comments)
})

router.get('/article/comment', (req, res) => {
  const comments = []

  db.comments.forEach(comment => {
    if (comment.id === req.query.commentId) {
      if (comment.articleId === req.query.articleId) {
        res.send(comment)
      } else {
        res.status(404).send('Comments not found')
      }
    } else {
      res.status(404).send('Comments not found')
    }
  })
})

app.use(bodyParser.json())

app.use(router)

app.listen(8080, () => {
  console.log('Serveur en marche sur 8080')
})
