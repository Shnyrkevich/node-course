const path = require('path')
const express = require('express')
const hbs = require('hbs')
const http = require('http');
const SocketIo = require('./socket/index');
const ChatService = require('./chat/chat.service');

// Create Express App;
const app = express();
// Create a server from exists App
const server = http.createServer(app);
// Create an Socket Instance
SocketIo.getIo(server);

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Chat-app',
        name: 'Eugene'
    })
});

app.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'Chat-app',
        name: 'Eugene'
    })
});

server.listen(port, () => {
	console.log(`Server is connected on port ${port}`);
});

new ChatService();