
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

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

        try {
            var currentModel = this.model;
        } catch (err) {

            if ('OverwriteModelError' === err.name) {
                return this._logger.log('Model %s is already defined', this._list);
            }

            if ('MissingSchemaError' !== err.name) {
                throw err;
            }

            // Defining current schema
            this.defineSchema();
        }
    }

    /**
     * Define schema
     */
    defineSchema() {
        var Types = this.mongoose.Schema.Types;

        var schemaObject = {
            title: {type: String, unique: true, required: true},
            url: {type: String, index: true, unique: true, required: true},
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
