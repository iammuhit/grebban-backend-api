const path = require('path');
const router = require('express').Router();

// Modules
const ProductsModule = require(path.resolve(process.env.PATH_MODULE, 'Product/ProductsModule'));

router.use('/', ProductsModule.routes);

module.exports = router;