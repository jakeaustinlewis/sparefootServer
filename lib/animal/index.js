const _ = require('lodash');
const db = require('../../db');

function get(where = {}) {
	return db.models.animal.findAll({
		where,
		limit: 100,
		include: [ db.models.rating ]
	});
}

module.exports = {
	get
};