const request = require('supertest');
const db = require('../config/dbConfig');
const server = require('./server');

describe('server', () => {
	afterEach(async () => {
		await db('games').truncate();
	});

	it('sets the environment to testing', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});
	describe('GET/', () => {
		it('should respond with 200 ok', () => {
			return request(server).get('/api/games').expect(200);
		});
		it('should return json', () => {
			return request(server).get('/api/games').then((res) => {
				expect(res.type).toBe('application/json');
			});
		});
		it('should return an array of games', () => {
			return request(server).get('/api/games').then((res) => {
				expect(Array.isArray(res.body)).toBeTruthy();
			});
		});
	});

	describe('POST', () => {
		it('should return json', () => {
			return request(server)
				.post('/api/games')
				.send({
					title: 'Pacman',
					genre: 'Arcade',
					releaseYear: 1980
				})
				.then((res) => {
					expect(res.type).toBe('application/json');
				});
		});
		it('should create new game and send back created game', () => {
			return request(server)
				.post('/api/games')
				.send({
					title: 'Pacman',
					genre: 'Arcade',
					releaseYear: 1980
				})
				.then((res) => {
					expect(res.body).toHaveProperty('id');
					expect(res.body.title).toBe('Pacman');
					expect(res.status).toBe(201);
					expect(typeof res).toBe('object');
					return request(server).get('/api/games').then((res) => {
						expect(res.body.length).toBe(1);
					});
				});
		});
		it('should return 409 status code if provided title is not unique', () => {
			return request(server)
				.post('/api/games')
				.send({
					title: 'Pacman',
					genre: 'Arcade',
					releaseYear: 1980
				})
				.then((res) => {
					return request(server)
						.post('/api/games')
						.send({
							title: 'Pacman',
							genre: 'Arcade',
							releaseYear: 1980
						})
						.then((res) => {
							expect(res.status).toBe(405);
						});
				});
		});
		it('should fail with status code 422 if information about the game is incomplete', () => {
			return request(server)
				.post('/api/games')
				.send({
					genre: 'Arcade',
					releaseYear: 1980
				})
				.then((res) => {
					expect(res.status).toBe(422);
				});
		});
	});
});
