exports.seed = function(knex, Promise) {
	return knex('games').truncate().then(function() {
		return knex('games').insert([
			{ title: 'Game1', genre: 'Gender1', releaseYear: 1111 },
			{ title: 'Game2', genre: 'Gender2', releaseYear: 2222 },
			{ title: 'Game3', genre: 'Gender3', releaseYear: 3333 }
		]);
	});
};
