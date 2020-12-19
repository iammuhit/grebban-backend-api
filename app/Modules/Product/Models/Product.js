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
        let skip = parseInt(options.skip);
        let limit = parseInt(options.limit);
        let collections = this.sortByName(this.collections);

        return new Promise((resolve, reject) => {
            if(!isNaN(skip) && !isNaN(limit)){
                resolve(_.take(_.slice(_.filter(collections, where), skip), limit));
            } else {
                resolve(_.filter(collections, where));
            }
        });
    }

    sortByName(collections) {
        return _.sortBy(collections, doc => doc.name);
    }

    colors(metadata = {}) {
        if(!(_.isEmpty(metadata))) {
            this.colorCollections = metadata;
        }

        return this.colorCollections;
    }

    categories(metadata = {}) {
        if(!(_.isEmpty(metadata))) {
            this.categoryCollections = metadata;
        }

        return this.categoryCollections;
    }

}

module.exports = Product;