import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import ListName from "./components/ListName"
import PersonForm from './components/PersonForm'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newNumbers, setNumber] = useState('')
	const [newName, setNewName] = useState('')
	const [filtered, setFiltered] = useState('')

	useEffect(() => {
		console.log('effect');
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled');
				setPersons(response.data)
			})
	}, [])
	console.log('render', persons.length, 'notes');

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
		setFiltered(event.target.value)
	}

	const showAllNumbers = persons.filter(x => x.name.includes(filtered))

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				<Filter handleFilter={handleFilter} />
			</div>
			<h2>Add a new person:</h2>
			<form onSubmit={addPerson}>
				<div>
					<PersonForm persons={persons} newName={newName} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} newNumbers={newNumbers} />
				</div>
				<button type="submit">add</button>
			</form >
			<h2>Numbers</h2>
			<ul>
				<ListName persons={showAllNumbers} />
			</ul>
		</div >
	)
}

export default App
