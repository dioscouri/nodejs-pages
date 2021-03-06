
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
            slug: {type: String, index: true, unique: true, required: true},
            content: {type: String},
            categories: [{ type: Types.ObjectId, ref: 'category' }],
            publication: {
                status: {type: String},
                start: {type: Date, 'default': Date.now},
                end: {type: Date, 'default': Date.now}
            }
        };

        var PageDBOSchema = this.createSchema(schemaObject);

        this.registerSchema(PageDBOSchema);
    }

    /**
     * Validate item
     *
     * @param item
     * @param validationCallback
     */
    validate(item, validationCallback) {
        var validationMessages = [];

        if (item.title === '') {
            validationMessages.push('Title cannot be empty');
        }

        if (item.slug === '') {
            validationMessages.push('Slug cannot be empty');
        }

        validationCallback(DioscouriCore.ValidationError.create(validationMessages));
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
