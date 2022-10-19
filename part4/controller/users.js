const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	const saltRounds = 10
	const passwordHash = await (bcrypt.hash(password, saltRounds))

	const user = new User({
		username,
		name,
		passwordHash
	})

	try {
		const
	}
})
