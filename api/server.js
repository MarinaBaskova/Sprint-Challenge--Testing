const express = require('express');
const server = express();
const helmet = require('helmet');

const gamesRouter = require('./routes/gamesRoutes');

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World' });
});

server.use('/api/games', gamesRouter);

module.exports = server;
