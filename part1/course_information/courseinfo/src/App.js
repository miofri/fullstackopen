const Header = (props) => {
	return (
		<h1>
			{props.course}
		</h1>
	)
}

const Part = (props) => {
	return (
		<>
			{props.part} {props.exercises}
		</>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part
				part={props.parts[0].part}
				exercise={props.parts[0].exercises}
			/>
			<Part
				part={props.parts[1].part}
				exercise={props.parts[1].exercises}
			/>
			<Part
				part={props.parts[2].part}
				exercise={props.parts[2].exercises}
			/>
		</div>
	)
}

const Total = (props) => {
	return (
		<p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
	)
}

const App = () => {
	const course = 'Half Stack application development';

	const parts = [
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

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total e1={parts[0].exercises} e2={parts[1].exercises} e3={parts[2].exercises} />
		</div>
	)
}

export default App;
