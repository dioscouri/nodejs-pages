// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 * Requiring base Model
 */
var Models           = {};
Models.PageModel = require('../page.js');
var Types            = Models.PageModel.mongoose.Schema.Types;

// Page Schema Object
var schemaObject = {
    title: {type: String, unique: true, required: true},
    slug: {type: String, index: true, unique: true, required: true},
    content: {type: String}
};

/**
 * Creating DBO Schema
 */
var PageDBOSchema = Models.PageModel.createSchema(schemaObject);

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = PageDBOSchema;
