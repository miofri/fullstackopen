const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// blogRouter.get('/', (request, response) => {
// 	Blog
// 		.find({})
// 		.then(blogs => {
// 			response.json(blogs)
// 		})
// })

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

// blogRouter.post('/', (request, response) => {
// 	const blog = new Blog(request.body)

// 	blog
// 		.save()
// 		.then(result => {
// 			response.status(201).json(result)
// 		})
// 		.catch(err => response.status(404).send(err.message))
// })

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)

	try {
		const result = await blog.save()
		response.status(201).json(result)
	} catch (exception) {
		response.status(400).send()
	}
})

blogRouter.delete('/:id', async (request, response) => {
	try {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	}
	catch (exception) {
		response.status(400).send()
	}
})
module.exports = blogRouter
