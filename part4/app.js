const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const Blog = require('./models/blog')
const blogRouter = require('./controller/bloglist')
const config = require('./utils/config')

app.get('/', (request, response) => {
	response.send('<h1>Blog List</h1>')
})

mongoose.connect(config.MONGO_URI)
	.then(() => {
		console.log('connected')
	})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
