const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
	const notes = loadNotes();
//	const duplicateNotes = notes.filter((note) => note.title === title);
	const duplicateNote = notes.find((note) => note.title === title);

//	if (duplicateNotes.length === 0) {
	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		});
		saveNotes(notes);
		console.log(chalk.green('New note added!'));
	} else {
		console.log(chalk.red('Note title taken!'));
	}
}

const delNote = (title) => {
	const notes = loadNotes();
	const notesToKeep = notes.filter((note) => note.title !== title);

	if (notes.length !== notesToKeep.length) {
		saveNotes(notesToKeep);
		console.log(chalk.yellow('Note "'+ title + '" deleted!'));
	} else {
		console.log(chalk.red("Note couldn't be found!"));
	}
}

const listNotes = () => {
	const notes = loadNotes();

	console.log(chalk.blue('Your notes :'));

	notes.forEach((note) => {
		console.log(note.title);
	})
}

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => note.title === title);

	if (note) {
		console.log(chalk.inverse(note.title));
		console.log(note.body);
	} else {
		console.log(chalk.red("Note couldn't be found!"));
	}
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJson = dataBuffer.toString();
		return JSON.parse(dataJson);
	} catch (e) {
		console.log(chalk.red('No such file as notes.json!'));
		return [];
	}
}

const saveNotes = (notes) => {
	const dataJson = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJson);
}

module.exports = {
	addNote: addNote,
	delNote: delNote,
	listNotes: listNotes,
	readNote: readNote
};
