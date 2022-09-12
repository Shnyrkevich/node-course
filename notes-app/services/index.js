const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
	try {
		const bufferData = fs.readFileSync('./notes.json');
		return JSON.parse(bufferData.toString());
	} catch(e) {
		console.log('notes.txt doesn\'t exist or doesn\'t have any json data.');
		return [];
	}
};

const saveNotes = (notes) => {
	try {
		const dataJSON = JSON.stringify(notes);
		fs.writeFileSync('./notes.json', dataJSON);
		console.log('---- NOTES SAVED ----')
	} catch(e) {
		console.log(chalk.red(e));
	}
}

const addHandler = ({ title, body }) => {
	const notes = loadNotes();
	const duplicatedNote = notes.find(note => note.title === title);
	if (!duplicatedNote) {
		console.log(chalk.green.inverse('New note added.'));
		saveNotes([...notes, { title, body }]);
	} else {
		console.log(chalk.yellow.inverse('Note title taken!'));
	}
};

const removeHandler = ({ title }) => {
	const notes = loadNotes();
	const filteredNotes = notes.filter(note => note.title !== title);

	if (notes.length > filteredNotes.length) {
		console.log(
			chalk.green.inverse(`Notes with title: ${title}, removed from the list!`)
		);
		saveNotes(filteredNotes);
	} else {
		console.log(
			chalk.yellow.inverse(`Notes with title: ${title} doesn't exist in the list!`)
		);
	}
};

const readHandler = ({ title }) => {
	const notes = loadNotes();
	const note = notes.find(note => note.title === title);
	if (!note) {
		console.log(
			chalk.yellow(`Note with title: ${title} doesn't exist in the list!`)
		);
		return;
	}
	console.log(chalk.green('Your Note: ') + note.title + ' ' + note.body);
};

const showNotesHandler = () => {
	const notes = loadNotes();
	if (!notes || !notes.length) {
		console.log(
			chalk.red('There are no notes in the list!')
		);
		return;
	}

	console.log(chalk.magenta('YOUR NOTES'));
	notes.forEach(
		note => console.log(
			chalk.blue.underline(note.title)
			+ " "
			+ chalk.blue(note.body)
		)
	);
};

module.exports = { 
	addHandler,
	readHandler,
	removeHandler,
	showNotesHandler
};