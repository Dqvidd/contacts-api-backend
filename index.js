const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware.js')

app.use(cors())
app.use(express.json())
app.use(logger)

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/plain' });
//     response.end("Hello World");

// });

let notes = [
  {
    id: 1,
    cositas: 'jaja'
  },
  {
    id: 2,
    cositas: 'jaja2'
  },
  {
    id: 3,
    cositas: 'jaja3'
  }

]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log({ id })
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
