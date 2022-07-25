import { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return (<button onClick={handleClick}>{text}</button>);
}

const StatisticLine = ({ text, value }) => {
	if (text === 'positive') {
		return (
			<tr>
				<td>{text}</td><td>{value.toFixed(1)} %</td>
			</tr>)
	}
	else if (text === 'avg') {
		return (
			<tr>
				<td>{text}</td><td>{value.toFixed(1)}</td>
			</tr>
		)
	}
	return (
		<tr>
			<td>{text}</td><td>{value}</td>
		</tr>
	)
}

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
	if (good > 0) {
		return (
			<table><tbody>
				<StatisticLine text='good' value={good} />
				<StatisticLine text='neutral' value={neutral} />
				<StatisticLine text='bad' value={bad} />
				<StatisticLine text='all' value={all} />
				<StatisticLine text='avg' value={avg} />
				<StatisticLine text='positive' value={positive} />
			</tbody></table>
		)
	}
	return (<p>No feedback given</p>)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
	}

	const handleBad = () => {
		setBad(bad + 1)
	}

	let avg = 0;
	const calcAvg = (avg) => {
		avg = (good - bad) / (good + neutral + bad)
		return avg
	}

	let positive = 0;
	const calcPositive = (positive) => {
		return positive = (good * 100 / (good + neutral + bad));
	}
	return (
		<div>
			<h2>give feedback</h2>
			<Button handleClick={handleGood} text='good' />
			<Button handleClick={handleNeutral} text='neutral' />
			<Button handleClick={handleBad} text='bad' />
			<h2>statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} all={good + neutral + bad} positive={calcPositive(positive)} avg={calcAvg(avg)} />
		</div>
	)
}

export default App
