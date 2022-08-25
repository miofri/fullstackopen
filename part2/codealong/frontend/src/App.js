import { useState, useEffect } from 'react'
// import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css';

const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16
	}
	return (
		<div style={footerStyle}>
			<br />
			<em>Note app, Department of Computer Science, University of Helsinki 2022</em>
		</div>
	)
}

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('a new note...')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		noteService.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() > 0.5,
		}
		noteService.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value)
	}

	const toggleImportance = (id) => {
		// find note item with a certain id
		const note = notes.find(n => n.id === id)
		// spread note i.e. create a copy of it and change important to not important.
		const changedNote = { ...note, important: !note.important }

		noteService.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(error => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	const noteToShow = showAll
		? notes
		: notes.filter(note => note.important === true)

	const Notification = ({ message }) => {
		if (message === null) {
			return null
		}

		return (
			<div className='error'>
				{message}
			</div>
		)
	}
	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{noteToShow.map(note =>
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportance(note.id)}
					/>
				)}
			</ul>
			<form onSubmit={addNote}>
				<input
					value={newNote}
					onChange={handleNoteChange}
				/>
				<button type="submit">save</button>
			</form>
			<Footer />
		</div>
	)
}

export default App
