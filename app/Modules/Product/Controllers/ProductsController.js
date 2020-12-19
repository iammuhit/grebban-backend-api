const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const Promise = require('bluebird');
const fetch = require('node-fetch');

const Product = require('../Models/Product');
const Attribute = require('../Models/Attribute');
const Color = require('../Models/Color');

fetch.Promise = Promise;

const ProductsController = {
    all: async (req, res) => {
        try {
            let dataHost = 'http://draft.grebban.com/backend';
            let productsPath = dataHost + '/products.json';
            let attributesPath = dataHost + '/attribute_meta.json';

            let productsData = await fetch(productsPath)
                .then(res => res.json())
                .then(doc => doc);

            let attributesData = await fetch(attributesPath)
                .then(res => res.json())
                .then(doc => doc);

            let product = new Product(productsData, attributesData);
            let attribute = new Attribute(attributesData);
            let colorsData = await attribute.findOne({ code: 'color' });
            let categoriesData = await attribute.findOne({ code: 'cat' });

            let color = new Color(colorsData.values);

            let page = parseInt(req.param('page')) || 1;
            let limit = parseInt(req.param('page_size')) || 10;
            let offset = limit * (page - 1);
            let total = await product.count();

            let products = await product.find({}, { limit: limit, skip: offset });

            products = _.map(products, (doc) => {
                let colorCodes = doc.attributes.color;
                let categoryCodes = doc.attributes.cat;
                let attributes = [];

                colorCodes = (colorCodes !== undefined) ? colorCodes.split(',') : [];
                categoryCodes = (categoryCodes !== undefined) ? categoryCodes.split(',') : [];

                _.forEach(colorCodes.sort(), (code) => {
                    let color = _.find(colorsData.values, { code: code });

                    attributes.push({ name: colorsData.name, value: color.name });
                });

                _.forEach(categoryCodes, (code) => {
                    let [key, parent, child] = code.split('_');
                    let parentCategory = _.find(categoriesData.values, { code: `${key}_${parent}` });
                    let childCategory = _.find(categoriesData.values, { code: `${key}_${parent}_${child}` });

                    let categoryValue = (parentCategory && childCategory) ? `${parentCategory.name} > ${childCategory.name}` : parentCategory.name;

                    attributes.push({ name: categoriesData.name, value: categoryValue });
                });

                doc.attributes = attributes;

                return doc;
            });

            return res.json({
                status: 'success',
                data: {
                    products: products,
                    page: page,
                    totalPages: Math.ceil(total / limit)
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