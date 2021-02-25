const express = require('express')
const app = express()
const port = 3000
const ORM = require('./ORM')()
app.use(express.json()) // for parsing application/json

/****** method codes ********/
const OK = 200
const NOT_FOUND = 404
const CREATED = 201
const NOT_ALLOWED = 405
const SERVER_ERROR = 500
/***************************** */

/************** API url books **************/
app.post('/apiv1/books', createBook)
app.get('/apiv1/books', readAllBooks)
app.put('/apiv1/books', updateBook)
app.delete('/apiv1/books/:id', deleteBook)
/****************  HANDLERS   *********************** */
function createBook (req, res) {
  const book = ORM.create(req.body)
  res.status(CREATED)
  return res.send(book)
}

function readAllBooks (req, res) {
  const books = ORM.findAll()
  res.status(OK)
  return res.send(books)
}

function deleteBook (req, res) {
  const id = ORM.destroy(req.params.id)
  res.status(OK)
  return res.send(id)
}

function updateBook (req, res) {
  const updatedBook = ORM.update(req.body)
  res.status(OK)
  return res.send(updatedBook)
}

/*************************************************************** */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
