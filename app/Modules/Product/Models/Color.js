const path = require('path');
const _ = require('lodash');

const Promise = require('bluebird');
const Model = require(path.resolve(process.env.PATH_APP, 'Models/Model'));

class Color extends Model {

}

module.exports = Color;