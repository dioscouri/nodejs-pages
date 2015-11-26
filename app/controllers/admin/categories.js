
// Using STRICT mode for ES6 features
"use strict";

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
class CategoriesAdminController extends AdminBaseCrudController {

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
        this._model = require('../../models/category.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/pages/categories';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = "categories";

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

        result.name = this.request.body.name;
        result.slug = this.request.body.slug;
        result.parent = this.request.body.parent || null;

        if (result.slug.toString() === '' && result.name.toString() != '') {
            result.slug = result.name.toString().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
        }

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

            this.data.appUrl = this.getActionUrl('list');
            this.loadParentCateories(readyCallback);
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
            this.loadParentCateories(readyCallback);
        }.bind(this));
    }

    loadParentCateories(readyCallback) {
        this._model.getAll(function (err, categories) {
            if (err) {
                return readyCallback(err);
            }
            this.data.categories = categories;
            readyCallback();
        }.bind(this));
    }
};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = CategoriesAdminController;
