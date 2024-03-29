const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require('mongoose')
const config = require('../utils/config')

console.log('blog.js is connecting to', config.MONGO_URI)

const blogSchema = new mongoose.Schema({
	author: String,
	title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0
	}
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
