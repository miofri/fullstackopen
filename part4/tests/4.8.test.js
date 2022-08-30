const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject
	for (let index = 0; index < blogs.length; index++) {
		blogObject = new Blog(blogs[index])
		await blogObject.save()
	}
})

describe('blogs', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 10000)

	test('blogs length', async () => {
		expect((await api.get('/api/blogs')).body).toHaveLength(6)
	}, 10000)

	test('blogs unique identifier is id', async () => {
		const response = await api.get('/api/blogs')
		console.log(response.body[0].id)
		expect(response.body[0].id).toBeDefined()
	})

	test('adding new blogs', async () => {
		const newBlog = {
			author: 'Jimmothy Beamers',
			title: 'How to parse 98%',
			likes: 420,
			url: 'Hello guys'
		}

		await api.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const content = response.body.map(r => r.title)

		expect(response.body).toHaveLength(blogs.length + 1)
		expect(content).toContain('How to parse 98%')
	})

	test('blog with no likes is not added', async () => {
		const newBlog = {
			title: 'Meh!',
			author: 'Boo!',
			url: 'test.com',
		}

		await api.post('/api/blogs')
			.send(newBlog)

		const response = await api.get('/api/blogs')
		console.log(await api.get('/api/blogs'))

		expect(response.body[response.body.length - 1].likes).toStrictEqual(0)
	})

	test('blog with no title or url sends response status 404', async () => {
		const newBlog = {
			author: 'Boo!',
			url: 'test.com',
		}

		const result = await api.post('/api/blogs')
			.send(newBlog)

		expect(result.status).toBe(400)
	})

	test('deleting one of the blogs', async () => {
		const response = await api.get('/api/blogs')
		const length = response.body.length

		const test_id = '5a422bc61b54a676234d17fc'
		const result = await api.delete(`/api/blogs/${test_id}`)
		expect(result.status).toBe(204)
		expect((await api.get('/api/blogs')).body).toHaveLength(length - 1)
	})

	afterAll(() => {
		mongoose.connection.close()
	})
})
