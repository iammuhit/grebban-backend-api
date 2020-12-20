const path = require('path');
const fs = require('fs-extra');
const uuid = require('node-uuid');
const _ = require('lodash');

const Promise = require('bluebird');

class Model {

    constructor(collections) {
        this.collections = collections;
    }

    findOne(where = {}) {
        let collections = this.collections;

        return new Promise((resolve, reject) => {
            resolve(_.find(collections, where));
        });
    }

    find(where = {}, options = {}) {
        let skip = parseInt(options.skip);
        let limit = parseInt(options.limit);
        let collections = this.collections;

        return new Promise((resolve, reject) => {
            if(!isNaN(skip) && !isNaN(limit)){
                resolve(_.take(_.slice(_.filter(collections, where), skip), limit));
            }
            else{
                resolve(_.filter(collections, where));
            }
        });
    }

    save(doc) {
        doc = _.merge(doc, { id: uuid.v4() });

        this.collections.push(doc);
        this._writeFile(this.collections);

        return new Promise((resolve, reject) => {
            resolve(doc);
        });
    }

    update(doc, where = {}) {
        let $this = this;
        let collections = this.collections;

        return new Promise((resolve, reject) => {
            let docs = _.filter(collections, where);
            let res = [];

            _.forEach(docs, (doc) => {
                let index = _.indexOf(collections, doc);
            
                // TODO
            });

            $this._writeFile(collections);

            resolve(res);
        });
    }

    delete(where = {}) {
        let collections = this.collections;
        let docs = _.remove(collections, where);

        this._writeFile(collections);

        return new Promise((resolve, reject) => {
            resolve(docs);
        });
    }

    count(where = {}) {
        return this.find(where).then(doc => doc.length);
    }

    sort(collections) {
        return new Promise((resolve, reject) => {
            resolve(_.sortBy(collections, doc => doc.name));
        });
    }

    _writeFile(collections) {
        // TODO
        
        return false;
    }

}

module.exports = Model;