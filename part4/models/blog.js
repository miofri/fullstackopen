const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require('mongoose')
const config = require('../utils/config');

console.log('connecting to', config.MONGO_URI)

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = mongoose.model('Blog', blogSchema)
