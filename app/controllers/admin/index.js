
// Using STRICT mode for ES6 features
"use strict";

var moment = require("moment");

/**
 * Requiring lodash library
 */
var _ = require('lodash');

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Controllers.BaseCRUD');

/**
 * Requiring SwigHelpers util
 */
var SwigHelpers = require("../../utils/swigHelpers.js");

var CategoryModel = require('../../models/category.js');

/**
 *  PagesAdminController controller
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class PagesAdminController extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../../models/page.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/pages';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = "pages";

        /**
         * Path to UI templates
         *
         * @type {string}
         * @private
         */
        this._baseViewsDir = require('path').join(__dirname, '..', '..', 'views', 'admin')

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['title', 'slug'];
    }



    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.title = this.request.body.title;
        result.slug = this.request.body.slug;
        result.content = this.request.body.content;
        result.categories = this.request.body.categories || [];

        if (!result.slug && result.title) {
            result.slug = result.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
        }

        var startDateStr = this.request.body.publication.start_date;
        var startTimeStr = this.request.body.publication.start_time;
        if (startDateStr && startTimeStr) {
            result.publication.start = moment(startDateStr + " " + startTimeStr, "MM/DD/YYYY hh:mm A");
        } else {
            result.publication.start = moment();
        }

        var endDateStr = this.request.body.publication.end_date;
        var endTimeStr = this.request.body.publication.end_time;
        if (endDateStr && endTimeStr) {
            result.publication.end = moment(endDateStr + " " + endTimeStr, "MM/DD/YYYY hh:mm A");
        } else {
            result.publication.end = moment();
        }

        return result;
    }

    load(readyCallback) {
        super.load(function (err) {
            if (err) {
                return readyCallback(err);
            }

            this.data.formatDateTime = function (date, format) {
                return moment(date).format(format);
            };

            readyCallback();
        }.bind(this));
    }

    /**
     * Create item
     *
     * @param readyCallback
     */
    create(readyCallback) {
        super.create(function (err) {
            if (err) {
                return readyCallback(err);
            }

            this.data.startDate = moment().format("MM/DD/YYYY");
            this.data.endDate = moment().format("MM/DD/YYYY");
            this.data.startTime = moment().format("hh:mm A");
            this.data.endTime = moment().format("hh:mm A");

            this.data.appUrl = this.getActionUrl('list');
            this.loadCategoriesInTree(readyCallback);
        }.bind(this));
    }

    /**
     * Create item
     *
     * @param readyCallback
     */
    doView(readyCallback) {
        super.doView(function (err) {
            if (err) {
                return readyCallback(err);
            }

            // Prepare data for SWIG template
            this.data.selectedCategories = {};
            _.each(this.data.item.categories, function( cat ){
                this.data.selectedCategories[cat] = true;
            }.bind(this));

            this.loadCategoriesInTree(readyCallback);
        }.bind(this));
    }

    /**
     * Edit item
     *
     * @param readyCallback
     */
    edit(readyCallback) {
        super.edit(function (err) {
            if (err) return readyCallback(err);

            this.data.appUrl = this.getActionUrl('list');

            // Prepare data for SWIG template
            this.data.selectedCategories = {};
            _.each(this.data.item.categories, function( cat ){
                this.data.selectedCategories[cat] = true;
            }.bind(this));

            if (this.data.item.publication) {
                this.data.startDate = moment(this.data.item.publication.start).format("MM/DD/YYYY");
                this.data.endDate = moment(this.data.item.publication.end).format("MM/DD/YYYY");

                this.data.startTime = moment(this.data.item.publication.start).format("hh:mm A");
                this.data.endTime = moment(this.data.item.publication.end).format("hh:mm A");
            }

            this.loadCategoriesInTree(readyCallback);
        }.bind(this));
    }

    /**
     * Load all categories from DB and create tree structure
     * @param callback
     */
    loadCategoriesInTree(callback) {
        CategoryModel.getAll(function (err, categories) {
            if (err) {
                return callback(err);
            }
            var rawCategories = _.map(categories, function(item) {
                return item.toJSON()
            });
            this.data.categories = SwigHelpers.createCategorieTree(rawCategories);
            callback();
        }.bind(this));
    }
};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = PagesAdminController;
