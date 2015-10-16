// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 *
 * WARNING: Core modules MUST be included from TOP Level Module.
 * All dependencies for core module must be excluded from the package.json
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Loader class for the model
 */
class Loader extends DioscouriCore.AppBootstrap {
    /**
     * Model loader constructor
     */
    constructor () {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        /**
         * Module name
         *
         * @type {null}
         * @private
         */
        this._moduleName = 'Pages App';

        /**
         * Module version
         * @type {string}
         * @private
         */
        this._moduleVersion = '0.0.1';
    }

    /**
     * Initializing module configuration
     */
    init () {
        super.init();

        // Loading module routes
        this.applicationFacade.server.loadRoutes('/app/routes', __dirname);

        // Loading models
        this.applicationFacade.loadModels(__dirname + '/app/models');

        // Initializing Library Exports
        this.applicationFacade.registry.push('Pages.Controllers.Admin.Index', Loader.Pages.Controllers.Admin.Index);
        this.applicationFacade.registry.push('Pages.Controllers.Front.Index', Loader.Pages.Controllers.Front.Index);
        this.applicationFacade.registry.push('Pages.Models.Page', Loader.Pages.Models.Page);
        this.applicationFacade.registry.push('Pages.Models.Category', Loader.Pages.Models.Category);

        // Checking Symbolic links
        var fs = require('fs');
        try {
            if (!fs.existsSync(DioscouriCore.ApplicationFacade.instance.basePath + '/public/pagesAssets')) {
                fs.symlinkSync(__dirname + '/app/assets', DioscouriCore.ApplicationFacade.instance.basePath + '/public/pagesAssets', 'dir');
            }
        } catch (error) {
            console.error('ERROR: Failed to create symbolic links');
            console.error(error.message);
        }
    }

    /**
     * Bootstrapping module
     *
     * MongoDB is available on this stage
     */
    bootstrap () {
        super.bootstrap();
    };

    /**
     * Run module based on configuration settings
     */
    run () {
        super.run();
    };
};

/**
 * Exporting Library Classes
 * @type {{Controllers: {Admin: {Index: (exports|module.exports)}, Front: {Index: (exports|module.exports)}}, Models: {Page: (PageModel|exports|module.exports)}}}
 */
Loader.Pages = {
    Controllers: {
        Admin: {
            Index: require('./app/controllers/admin/index.js')
        },
        Front: {
            Index: require('./app/controllers/front/index.js')
        }
    },
    Models: {
        Page: require('./app/models/page.js'),
        Category: require('./app/models/category.js')
    }
};

/**
 * Exporting module classes and methods
 */
module.exports = Loader;