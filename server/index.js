import 'jade'
import browserify from 'browserify-middleware'
import express from 'express'
import path from 'path'

const dotslash = _path => path.join(__dirname, _path)

const app = express()

// settings

app.set('port', process.env.PORT || 5000)
app.set('view engine', 'jade')
app.set('views', dotslash('/views'))

// middleware

app.use(express.static(dotslash('public')))
app.use(express.static(dotslash('node_modules/ecoscript/examples/')))

// routes

app.get('/js/bundle.js', browserify(dotslash('/client/main.js')))

app.get('/', (request, response) => {
  response.render('index')
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
