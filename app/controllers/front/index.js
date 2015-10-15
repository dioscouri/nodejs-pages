
// Using STRICT mode for ES6 features
"use strict";

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
class PagesFrontController extends DioscouriCore.Controller {
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
        // Set page data
        that.data.header = "Pages";
        that.data.slug = this.request.params.slug;

        var model = DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Page');

        if (this.request.params.slug) {
            that.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/front/page_slug.swig'));
            model.findOne({slug: this.data.slug}, function(error, document){
                if (document && document.content) {
                    that.data.header = document.title;
                    that.data.pageContent = document.content;
                }
                dataReadyCallback(error);
            });
        } else {
            that.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/front/index.swig'));
            model.getAll(function(error, documents){
                that.data.pages = documents;
                dataReadyCallback(error);
            });
        }
    }
};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = PagesFrontController;