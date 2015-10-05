
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 *  Page model class
 */
class PageModel extends DioscouriCore.MongooseModel {
    /**
     * Model constructor
     */
    constructor (listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Define schema
     */
    defineSchema() {
        var Types = this.mongoose.Schema.Types;

        var schemaObject = {
            title: {type: String, unique: true, required: true},
            slug: {type: String, index: true, unique: true, required: true},
            content: {type: String}
        };

        var PageDBOSchema = this.createSchema(schemaObject);

        this.registerSchema(PageDBOSchema);
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
