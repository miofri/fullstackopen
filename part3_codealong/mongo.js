const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Please provide the passwd as an arg: node mongo.js <passw>');
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://slvkesuma:${password}@cluster0.smqtqch.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
	.connect(url)
	.then((result) => {
		console.log('connected');

		// const note = new Note({
		// 	content: 'CSS is a bit hard',
		// 	date: new Date(),
		// 	important: true,
		// })

		// return note.save()

		return Note.find({})
	})
	.then(
		result => {
			result.forEach(note => {
				console.log(note)
			});
			console.log('note saved');
			return mongoose.connection.close()
		})
	.catch((err) => console.log(err))
