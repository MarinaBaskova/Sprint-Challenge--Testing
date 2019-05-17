const db = require('../../config/dbConfig');

module.exports = {
	find,
	add
};

function find() {
	return db('games');
}

function add(game) {
	return db('games').insert(game, 'id').then(([ id ]) => {
		const game = db('games').where({ id }).first();
		return game;
	});
}
