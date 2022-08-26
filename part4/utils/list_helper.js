const _ = require('lodash')

const dummy = () => {
	return 1
}

const totalLikes = (array) => {
	array = array.map(x => x.likes)
	return array.reduce((x, y) => x + y)
}

const favoriteBlog = (array) => {
	let likes = array.map(x => x.likes)
	let maxVal = Math.max(...likes)

	array = array.find(x => x.likes === maxVal)

	let blogDetail = {
		title: array.title,
		author: array.author,
		likes: array.likes
	}
	return blogDetail
}

const mostBlogs = (array) => {
	let maxVal = 0
	let maxObj = {}
	let result = _.groupBy(array, 'author')

	for (let index = 0; index < Object.values(result).length; index++) {
		if (Object.values(result)[index].length > maxVal) {
			maxVal = Object.values(result)[index].length
			maxObj = Object.values(result)[index]
		}
	}

	let finalObj = {
		author: maxObj[0].author,
		blogs: maxVal
	}

	return finalObj
}

const mostLikes = (array) => {
	let maxObj = {}
	let maxLike = 0
	let result = _.groupBy(array, 'likes')

	// console.log(Object.values(result)[0][0].likes)
	// console.log(Object.values(result))
	// console.log(Object.values(result)[0])
	// console.log(Object.values(result).length);

	for (let index = 0; index < Object.values(result).length; index++) {
		if (Object.values(result)[index][0].likes > maxLike) {
			maxLike = Object.values(result)[index][0].likes
			maxObj = Object.values(result)[index][0]
		}
	}

	let finalObj = {
		author: maxObj.author,
		likes: maxLike
	}

	return finalObj
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
