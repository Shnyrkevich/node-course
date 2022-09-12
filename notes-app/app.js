const yargs = require('yargs');

// additional modules
const handlers = require('./services/index');

// Commands config
const CommandsConfig = [
    {
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true, // required property
                type: 'string'
            },
            body: {
                describe: 'Note description',
                demandOption: true,
                type: 'string'
            }
        },
        handler: handlers.addHandler
    },
    {
        command: 'remove',
        describe: 'Remove note by title',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
        },
        handler: handlers.removeHandler
    },
    {
        command: 'read',
        describe: 'Read note by title',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
        },
        handler: handlers.readHandler
    },
    {
        command: 'list',
        describe: 'Show notes',
        handler: handlers.showNotesHandler
    }
];

// Create commands
CommandsConfig.forEach(conf => yargs.command(conf));

yargs.parse();