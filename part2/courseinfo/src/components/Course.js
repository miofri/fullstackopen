import React from 'react'

const Header = ({ course }) => {
	return <h2>{course}</h2>
}

const Part = ({ parts }) => {
	return (parts.map(({ name, exercises, id }) =>
		<li key={id}>{name} {exercises}</li>)
	)
}

const Total = ({ parts }) => {
	let total = []
	total = parts.map(({ exercises }) => total.concat(exercises))
	total = total.reduce((sum, x) => parseFloat(sum) + parseFloat(x))
	return <p><b>total of {total} exercises</b></p>
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Part parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course
