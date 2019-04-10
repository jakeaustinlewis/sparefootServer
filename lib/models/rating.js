module.exports = (sequelize, types) => {
	return sequelize.define('rating', {
		type: {
			type: types.STRING,
			allowNull: false
		},
		animalId: {
			type: types.INTEGER,
			allowNull: false
		},
		score: {
			type: types.DECIMAL,
			allowNull: false
		}
	}, {
		freeTableName: true,
		timestamps: false,
		classMethods: {},
		instanceMethods: {}
	});
};