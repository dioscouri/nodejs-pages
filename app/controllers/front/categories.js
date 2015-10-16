
// Using STRICT mode for ES6 features
"use strict";

var _ = require('lodash');

/**
 * Path module
 */
var path = require('path');

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Requiring SwigHelpers util
 */
var SwigHelpers = require("../../utils/swigHelpers.js");

/**
 *  Base application controller
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class CategoriesFrontController extends DioscouriCore.Controller {
    /**
     * Controller constructor
     */
    constructor (request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /***
         * Location of views
         * @type {string}
         * @private
         */
        this._viewsPath = path.join(__dirname, '..', '..', 'views');

        /**
         * Category model
         */
        this._modelCategory = DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Category');

        /**
         * Page model
         */
        this._modelPage = DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Page');
    }

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load (dataReadyCallback) {
        var that = this;
        var slug = this.request.params.slug;
        that.data.header = "Pages";

        if (slug) {
            this.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/front/category_slug.swig'));
            this.loadPagesByCategorySlug(slug, dataReadyCallback);
        } else {
            this.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/front/categories.swig'));
            this.loadCategoriesInTree(dataReadyCallback);
        }
    }

    /**
     * Find all pages associated to specified category slug
     * @param slug
     * @param callback
     */
    loadPagesByCategorySlug (slug, callback) {
        this._modelCategory.findOne({slug: slug}, function(error, category){
            if (error) {
                return callback(error);
            }
            if (category) {
                this._modelPage.model.find({categories: category._id}, function (err, pages) {
                    this.data.pages = pages;
                    callback(err);
                }.bind(this));
            } else {
                callback();
            }
        }.bind(this));
    }

    /**
     * Load all categories from DB and create tree structure
     * @param callback
     */
    loadCategoriesInTree (callback) {
        this._modelCategory.getAll(function(error, categories){
            if (error) {
                return callback(error);
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
exports = module.exports = CategoriesFrontController;