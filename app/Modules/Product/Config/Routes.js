const router = require('express').Router();

const ProductsController = require('../Controllers/ProductsController');
const CategoriesController = require('../Controllers/CategoriesController');

router.get('/products', ProductsController.all);
router.get('/products/product', ProductsController.all); // client wants this endpoint
router.post('/products', ProductsController.create);
router.get('/products/:id', ProductsController.find);
router.put('/products/:id', ProductsController.update);
router.delete('/products/:id', ProductsController.delete);

router.get('/categories', CategoriesController.all);
router.post('/categories', CategoriesController.create);
router.get('/categories/:id', CategoriesController.find);
router.put('/categories/:id', CategoriesController.update);
router.delete('/categories/:id', CategoriesController.delete);

module.exports = router;