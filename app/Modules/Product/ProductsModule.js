const path = require('path');
const routes = require('./Config/Routes');

const ProductsModule = {
    routes: routes,
    path: path.resolve(__dirname)
};

module.exports = ProductsModule;