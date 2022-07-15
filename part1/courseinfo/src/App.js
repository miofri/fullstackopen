const Header = (props) => {
	console.log(props);
	return (
		<h1>
			{props.course.name}
		</h1>
	)
}

const Part = (props) => {
	console.log("Parts=" + props.part + props.exercise);
	return (
		<div>
			{props.part} {props.exercise}
		</div>
	)
}

const Content = (props) => {
	console.log(props);
	return (
		<div>
			<Part
				part={props.parts.parts[0].part}
				exercise={props.parts.parts[0].exercises}
			/>
			<Part
				part={props.parts.parts[1].part}
				exercise={props.parts.parts[1].exercises}
			/>
			<Part
				part={props.parts.parts[2].part}
				exercise={props.parts.parts[2].exercises}
			/>
		</div>
	)
}

const Total = (props) => {
	console.log(props);
	return (
		<p>Number of exercises {props.exercise.parts[0].exercises + props.exercise.parts[1].exercises + props.exercise.parts[2].exercises}</p>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				part: 'Fundamentals of React',
				exercises: 10
			},
			{
				part: 'Using props to pass data',
				exercises: 7
			},
			{
				part: 'State of a component',
				exercises: 14
			}
		]
	}
	return (
		<div>
			<Header course={course} />
			<Content parts={course} />
			<Total exercise={course} />
		</div>
	)
}

export default App;
