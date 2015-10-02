
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring base Model
 */
var BaseModel = require('./basemodel.js');

/**
 *  Page model class
 */
class PageModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor (listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new PageModel('page');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;

/**
 * Initializing Schema for model
 */
modelInstance.initSchema('/dbo/page.js', __dirname);
