const _ = require('lodash');
const Sequelize = require('sequelize');
const fs = require('fs');
const Promise = require('bluebird');
const Umzug = require('umzug');
const config = require('../config/config.json').development;
const path = require('path');

const db = {
	sync
};

function migrate() {
	return new Promise((resolve) => {
		const umzug = new Umzug({
			storage: 'sequelize',
			storageOptions: {
				sequelize: db.sequelize
			},
			migrations: {
				params: [this, {}, function(){
					throw new Error('Tried to use old style callback. Stop that.');
				}],
				path: path.resolve(`${__dirname}/migrations`),
				pattern: /\.js$/
			}
		});

		console.log('running migrations...');
		return umzug.up()
		.then((migrations) => {
			if(migrations && migrations.length){
				console.log(`processed ${migrations.length} new migrations`);
				console.log(_.map(migrations, (m) => `\t${m.file}`).join('\n'));
			} else {
				console.log('no new migrations to run');
			}
			resolve();
		});
	});
}

function sync() {
	return db.sequelize.sync()
	.then(() => {
		return migrate()
	})
}

function init() {
	db.sequelize = new Sequelize(config);

	db.models = {};
	fs.readdirSync('lib/models')
	.filter((file) => {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach((file) => {
		const model = require(`../lib/models/${file}`)(db.sequelize, Sequelize);
		db.models[model.name] = model;
	});

	// associations
	db.models.animal.hasMany(db.models.rating);
	db.models.rating.belongsTo(db.models.animal);
}

module.exports = (() => {
	if (!db.sequelize) {
		init();
	}
	return db;
})();