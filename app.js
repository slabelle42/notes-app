const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
	command: ['add', 'a'],
	describe: 'Add a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true, //rend le titre indispensable
			type: 'string' //ce titre est une string (non-empty!)
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body);
	}
});

yargs.command({
	command: ['delete', 'd'],
	describe: 'Delete a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.delNote(argv.title);
	}
});

yargs.command({
	command: ['list',  'l'],
	describe: 'List all notes',
	handler() {
		notes.listNotes();
	}
});

yargs.command({
	command: ['read', 'r'],
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.readNote(argv.title);
	}
});

yargs.parse(); //yargs réagit aux arguments et procède à l'affichage
