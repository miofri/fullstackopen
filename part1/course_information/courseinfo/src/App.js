const Header = (props) => {
	return (
		<h1>
			{props.course}
		</h1>
	)
}

const Content = (props) => {
	return (
		<>
			<p>{props.parts} {props.exercises}</p>
		</>
	)
}

const Total = (props) => {
	return (
		<p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
	)
}

const App = () => {
	const course = 'Half Stack application development';
	const part1 = 'Fundamentals of React';
	const exercises1 = 10;
	const part2 = 'Using props to pass data';
	const exercises2 = 7;
	const part3 = 'State of a component';
	const exercises3 = 14;

	return (
		<div>

		</div>
	)
}

export default App;
