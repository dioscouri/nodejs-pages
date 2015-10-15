
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
    }

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load (dataReadyCallback) {
        var that = this;
        that.data.header = "Pages";

        var modelCategory = DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Category');
        var modelPage = DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Page');

        if (that.request.params.slug) {
            that.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/front/category_slug.swig'));
            modelCategory.findOne({slug: that.request.params.slug}, function(error, category){
                if (error) {
                    return dataReadyCallback(error);
                }
                if (category) {
                    modelPage.model.find({categories: category._id}, function (err, pages) {
                        that.data.pages = pages;
                        dataReadyCallback(err);
                    });
                } else {
                    dataReadyCallback();
                }
            });


        } else {
            that.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/front/categories.swig'));
            modelCategory.getAll(function(error, categories){
                var rawCategories = _.map(categories, function(item) {
                    return item.toJSON()
                });
                that.data.categories = that.createCategorieTree(rawCategories);
                dataReadyCallback();
            });
        }
    }

    createCategorieTree(array, parent, tree ){
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
            _.each( children, function( child ){ that.createCateoriesTree( array, child ) } );
        }

        return tree;
    }
};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = CategoriesFrontController;