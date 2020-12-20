const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const fetch = require('node-fetch');

const Promise = require('bluebird');
const Product = require('../Models/Product');
const Attribute = require('../Models/Attribute');
const Color = require('../Models/Color');
const Category = require('../Models/Category');
const Pagination = require(path.resolve(process.env.PATH_APP, 'Helpers/Pagination'));
const settings = require('../Config/Settings');

fetch.Promise = Promise;

const ProductsController = {
    all: async (req, res) => {
        try {
            let productsData = await fetch(settings.productsPath)
                .then(res => res.json())
                .then(doc => doc);

            let attributesData = await fetch(settings.attributesPath)
                .then(res => res.json())
                .then(doc => doc);

            let product = new Product(productsData, attributesData);
            let attribute = new Attribute(attributesData);

            let colors = await attribute.findOne({ code: 'color' });
            let categories = await attribute.findOne({ code: 'cat' });

            let color = new Color(colors.values);
            let category = new Category(categories.values);

            // Pagination
            let total = await product.count();
            let pagination = (new Pagination).create(total, req.query.page_size, req.query.page);

            product.orderByName(); // sort the whole document by Product Name
            // product.rearrangeCollections(); // rearrange the whole document

            let products = await product.find({}, { limit: pagination.limit, skip: pagination.offset });

            products = product.rearrangeCollections(products); // rearrange only the retrieved data

            return res.json({
                status: 'success',
                data: {
                    products: products,
                    page: pagination.current_page,
                    totalPages: pagination.total_pages
                }
            });
        } catch (err) {
            return res.json({
                status: 'error',
                data: {
                    message: err.message
                }
            });
        }
    },
    find: async (req, res) => {

    },
    create: async (req, res) => {

    },
    update: async (req, res) => {

    },
    delete: async (req, res) => {
        
    }
};

module.exports = ProductsController;