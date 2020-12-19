const path = require('path');
const router = require('express').Router();

const HomeController = require(path.resolve(process.env.PATH_APP, 'Http/Controllers/HomeController'));

router.get('/', HomeController.index);

module.exports = router;