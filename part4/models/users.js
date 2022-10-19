const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require('mongoose')
const config = require('../utils/config')

console.log('blog.js is connecting to', config.MONGO_URI)

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: [3, 'username too short']
	},
	name: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
