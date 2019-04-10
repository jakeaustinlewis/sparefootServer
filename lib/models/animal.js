module.exports = (sequelize, types) => {
	return sequelize.define('animal', {
		name: {
			type: types.STRING(32),
			allowNull: false,
		},
		species: {
			type: types.STRING(32),
			allowNull: false
		},
		breed: {
			type: types.STRING(32),
			null: false
		},
		age: {
			type: types.DECIMAL,
			allowNull: false,
		},
		gender: {
			type: types.STRING(32),
			allowNull: false,
		},
		weight: {
			type: types.DECIMAL,
			allowNull: false
		},
		color: {
			type: types.STRING(32),
			allowNull: false
		},
		price: {
			type: types.DECIMAL,
			allowNull: false
		},
		specialty: {
			type: types.TEXT,
			allowNull: true,
			defaultValue: null
		},
		image: {
			type: types.STRING,
			allowNull: true,
			defaultValue: null
		}
	}, {
		freeTableName: true,
		timestamps: false,
		classMethods: {},
		instanceMethods: {}
	});
};