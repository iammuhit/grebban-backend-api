const path = require('path');
const _ = require('lodash');

const Promise = require('bluebird');
const Model = require(path.resolve(process.env.PATH_APP, 'Models/Model'));

class Product extends Model {

    constructor(collections, attributeCollections) {
        super(collections);

        this.attributeCollections = attributeCollections;
    }

    find(where = {}, options = {}) {
        let self = this;
        let skip = parseInt(options.skip);
        let limit = parseInt(options.limit);

        return new Promise((resolve, reject) => {
            if(!isNaN(skip) && !isNaN(limit)){
                resolve(_.take(_.slice(_.filter(self.collections, where), skip), limit));
            } else {
                resolve(_.filter(self.collections, where));
            }
        });
    }

    orderByName(collections) {
        if(!(_.isEmpty(collections))) {
            return collections = _.sortBy(collections, doc => doc.name);
        }

        return this.collections = _.sortBy(this.collections, doc => doc.name);
    }

    colors() {
        return _.find(this.attributeCollections, { code: 'color' });
    }

    categories() {
        return _.find(this.attributeCollections, { code: 'cat' });
    }

    rearrangeCollections(collections) {
        collections = collections || this.collections;

        return _.map(collections, (doc) => {
            let colors = this._rearrangeColors(doc.attributes.color);
            let categories = this._rearrangeCategories(doc.attributes.cat);
            let attributes = [];

            attributes.push(...colors);
            attributes.push(...categories);

            doc.attributes = attributes;

            return doc;
        });
    }

    _rearrangeColors(codes, attributes) {
        let colors = this.colors();

        codes = (codes !== undefined) ? codes.split(',') : [];
        attributes = attributes || [];

        _.forEach(codes.sort(), (code) => {
            let color = _.find(colors.values, { code: code });

            attributes.push({ name: colors.name, value: color.name });
        });

        return attributes;
    }

    _rearrangeCategories(codes, attributes) {
        let categories = this.categories();
        
        codes = (codes !== undefined) ? codes.split(',') : [];
        attributes =  attributes || [];

        _.forEach(codes, (code) => {
            let [key, parent, child] = code.split('_');
            let category_parent = _.find(categories.values, { code: `${key}_${parent}` });
            let category_child = _.find(categories.values, { code: `${key}_${parent}_${child}` });

            let categoryValue = (category_parent && category_child) ? `${category_parent.name} > ${category_child.name}` : `${category_parent.name}`;

            attributes.push({ name: categories.name, value: categoryValue });
        });

        return attributes;
    }

}

module.exports = Product;