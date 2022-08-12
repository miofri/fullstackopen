import { useState, useEffect } from 'react'
// import axios from 'axios';
import Filter from './components/Filter'
import ListName from "./components/ListName"
import PersonForm from './components/PersonForm'
import phonebookServices from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([])
	const [newNumbers, setNumber] = useState('')
	const [newName, setNewName] = useState('')
	const [filtered, setFiltered] = useState('')

	useEffect(() => {
		phonebookServices.getAll()
			.then(response => setPersons(response))
	}, [])

	// for finding if name already existed in the phonebook
	const checkName = ({ persons }) => {
		let names = []
		names = persons.map(x => x.name)
		return (names.includes(newName))
	}

	// adding a new personObj to
	const addPerson = (event) => {

		event.preventDefault()

		if (checkName({ persons }) === true) {
			if (window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)) {

				const changedPerson = persons.find(n => n.name === newName)
				const changedNumber = { ...changedPerson, number: newNumbers }

				return (phonebookServices.updateNumber(changedNumber, changedPerson.id)
					.then(response => {
						setPersons(persons.map(x => x.id !== changedNumber.id ? x : response))
					})
					.catch(err => console.log('update failed'))
				)
			}
			else {
				return event.preventDefault()
			}
		}

		const personObj = {
			name: newName,
			number: newNumbers,
		}

		phonebookServices.createPerson(personObj)
			.then(response => {
				setPersons(persons.concat(response))
				setNewName('')
				setNumber('')
			})
	}

	const handleDelete = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			phonebookServices.deletePerson(id)
				.then(
					setPersons(persons.filter(persons =>
						persons.id !== id
					))
				)
				.catch(err => console.log('delete failed'))
		}

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
			<ListName persons={showAllNumbers} handleDelete={handleDelete} />
		</div >
	)
}

export default App
