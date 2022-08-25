const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URI

console.log('connecting to', mongoUrl)

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

mongoose.connect(mongoUrl)
	.then(() => {
		console.log("connected")
		// if (process.argv.length > 4) {
		// 	const test = new Blog({
		// 		title: process.argv[2],
		// 		author: process.argv[3],
		// 		url: process.argv[4],
		// 		likes: process.argv[5]
		// 	})
		// 	test.save()
		// 		.then(() =>
		// 			console.log('save successful')
		// 		)
		// }
	})

module.exports = mongoose.model('Blog', blogSchema)
