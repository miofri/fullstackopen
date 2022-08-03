import { useState } from 'react'

const ListName = ({ persons }) => {
	return (
		persons.map((x) => <li key={x.name}>{x.name} {x.number}</li>)
	)
}

// const filteredName = ({ persons }) => {
// 	let copyPersons = persons.filter(x => x.name === newName)
// 	console.log(copyPersons)
// }

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' },
		{ name: 'Ada Lovelace', number: '39-44-532322' },
		{ name: 'Ben Anto', number: '040-9881232' },
	])
	const [newNumbers, setNumber] = useState('')
	const [newName, setNewName] = useState('')
	const [filtered, setFiltered] = useState('')
	const [showAll, setShowAll] = useState(true)

	const checkName = ({ persons }) => {
		let names = []
		names = persons.map(x => x.name)
		return (names.includes(newName))
	}

	const addPerson = (event) => {

		event.preventDefault()

		if (checkName({ persons }) === true) {
			return event.preventDefault(alert(`${newName} is already added to phonebook`))
		}

		const personObj = {
			name: newName,
			number: newNumbers,
		}
		setPersons(persons.concat(personObj))
		setNewName('')
		setNumber('')
	}

	const handlePersonChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNumber(event.target.value)
	}

	const handleFilter = (event) => {
		console.log('I am filtered', filtered);
		console.log('I am showAllNum', showAllNumbers);
		setFiltered(event.target.value)
	}

	const showAllNumbers = showAll
		? persons
		: persons.filter(x => x.name.includes(filtered))

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input onChange={handleFilter} />
			</div>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'filtered' : 'all'}
				</button>
			</div>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handlePersonChange} />
				</div>
				<div>number: <input value={newNumbers} onChange={handleNumberChange} /></div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				<ListName persons={showAllNumbers} />
			</ul>
		</div>
	)
}

export default App
