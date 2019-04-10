const router = require('express').Router();
const Animal = require('./lib/animal');

router.get('/ping', (req, res) => {
	res.send('1');
});

/** ANIMAL ROUTES */
router.get('/animals', (req, res) => {
	Animal.get()
	.then((animals) => {
		res.json(animals)
	});
});
module.exports = router;