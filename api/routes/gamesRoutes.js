const express = require('express');
const router = express.Router();
const db = require('./gamesModel.js');

router.get('/', (req, res) => {
	db
		.find()
		.then((games) => {
			res.status(200).json(games);
		})
		.catch((err) => {
			res.status(500).json({
				error: 'The games information could not be retrieved'
			});
		});
});

router.post('/', (req, res) => {
	const newGame = req.body;
	if (!newGame.title || !newGame.genre) {
		res.status(422).json({ message: 'Please provide a valid title, genre and release year.' });
	} else {
		db
			.add(newGame)
			.then((newGame) => {
				res.status(201).json(newGame);
			})
			.catch((error) => {
				res
					.status(405)
					.json({ message: `Your game titlte could not be posted, game title is not unique ${error}.` });
			});
	}
});

module.exports = router;
