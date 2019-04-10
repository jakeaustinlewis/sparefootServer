const Promise = require('bluebird');
const db = require('../');
const { animals } = require('../seeds');

module.exports = {
  up: function (queryInterface, Sequelize) {
  	Promise.map(animals, (data) => {
	  return db.models.animal.create(data)
		.then((animal) => {
			return Promise.map(data.ratings, (rating) => {
				rating.animalId = animal.id;
				return db.models.rating.create(rating);
			})
		})
	});
  },

  down: function (queryInterface, Sequelize) {
	/*
	  Add reverting commands here.
	  Return a promise to correctly handle asynchronicity.

	  Example:
	  return queryInterface.dropTable('users');
	*/
  }
};
