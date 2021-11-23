const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require('mongodb')

app.use(express.json()) // for parsing application/json

/************************MONGO DB************* */
// Connection URI
const uri = 'mongodb://127.0.0.1:27017?poolSize=20&writeConcern=majority'

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true })
async function run () {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    const db = await client.db('web-server-tutorial').command({ ping: 1 })
    const booksCollection = await db.collection('books')
    console.log('Connected successfully to mongo server')
    /************** API url books **************/
    app.post('/apiv1/books', createBook)
    app.get('/apiv1/books', readAllBooks)
    app.put('/apiv1/books', updateBook)
    app.delete('/apiv1/books/:id', deleteBook)

    /****** method codes ********/
    const OK = 200
    const NOT_FOUND = 404
    const CREATED = 201
    const NOT_ALLOWED = 405
    const SERVER_ERROR = 500
    /***************************** */

    /****************  HANDLERS   *********************** */
    async function createBook (req, res, next) {
      //const book = ORM.create(req.body)
      try {
        const result = await booksCollection.insertOne(req.body)
        res.status(CREATED)
        return res.send(result)
      } catch (err) {
        next(err)
      }
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
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
