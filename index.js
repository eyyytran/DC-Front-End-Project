const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/public', express.static('./public'))
app.engine('html', es6Renderer)
app.set('views', './views')
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/app', (req, res) => {
    res.render('mainpage')
})

app.listen(PORT, console.log(`listening on port ${PORT}`))
