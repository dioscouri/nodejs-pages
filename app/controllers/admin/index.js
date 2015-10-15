
// Using STRICT mode for ES6 features
"use strict";

var moment = require("moment");

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
        this._baseUrl = '/admin/page';

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
        result.publication.start = moment(this.request.body.publication.start_date, "MM/DD/YYYY");
        result.publication.end = moment(this.request.body.publication.end_date, "MM/DD/YYYY");
        result.content = this.request.body.content;
        result.categories = this.request.body.categories || [];

        return result;
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

            this.loadCateories(readyCallback);
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

            // Prepare data for SWIG template
            this.data.selectedCategories = {};
            _.each(this.data.item.categories, function( cat ){
                this.data.selectedCategories[cat] = true;
            }.bind(this));

            if (this.data.item.publication) {
                this.data.startDate = moment(this.data.item.publication.start).format("MM/DD/YYYY");
                this.data.endDate = moment(this.data.item.publication.end).format("MM/DD/YYYY");
            }

            this.loadCategories(readyCallback);
        }.bind(this));
    }

    loadCategories(readyCallback) {
        var that = this;
        require('../../models/category.js').getAll(function (err, categories) {
            if (err) {
                return readyCallback(err);
            }

            var rawCategories = _.map(categories, function(item) {
                return item.toJSON()
            });

            this.data.categories = that.createCategoriesTree(rawCategories);

            readyCallback();
        }.bind(this));
    }

    createCategoriesTree(array, parent, tree ){
        var that = this;
        parent = parent ? parent : { };
        tree = tree ? tree : [];

        var children = _.filter( array, function(child){
            if (parent._id) {
                if (child.parent) {
                    return child.parent.toString() == parent._id.toString();
                }
                return false;
            }
            return !child.parent;
        });

        if( !_.isEmpty( children )  ){
            if(!parent._id){
                tree = children;
            }else{
                parent['children'] = children
            }
            _.each( children, function( child ){ that.createCategoriesTree( array, child ) } );
        }

        return tree;
    }
};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = PagesAdminController;
