import { useState, useEffect } from 'react'
// import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('a new note...')
	const [showAll, setShowAll] = useState(true)

	// useEffect(() => {
	// 	console.log('effect');
	// 	axios
	// 		.get('http://localhost:3001/notes')
	// 		.then(response => {
	// 			console.log('promise fulfilled');
	// 			setNotes(response.data)
	// 		})
	// }, [])

	useEffect(() => {
		noteService.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	// console.log('render', notes.length, 'notes');

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() > 0.5,
			// id: notes.length + 1,
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
				alert(`the note '${note.content}' was already deleted from server`)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	const noteToShow = showAll
		? notes
		: notes.filter(note => note.important === true)

	return (
		<div>
			<h1>Notes</h1>
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
		</div>
	)
}

export default App
