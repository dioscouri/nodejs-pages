// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring core Events module
 */
var events = require('events');

var DioscouriCore = require('dioscouri-core');

var applicationFacade = DioscouriCore.ApplicationFacade.instance;

class PagesApp extends events.EventEmitter {
    /**
     * Controller constructor
     */
    constructor () {
        super();

        this._appName = 'Pages App';

        this._appPath = __dirname;

        this._routesPath = require("path").join(this._appPath, 'app', 'routes');

        this._controllersPath = require("path").join(this._appPath, 'app', 'controllers');

        this._modelsPath = require("path").join(this._appPath, 'app', 'models');
    }

    /**
     * Returns App Name
     *
     * @returns {string}
     */
    get appName () {
        return this._appName;
    }

    get routesPath () {
        return this._routesPath;
    }

    get controllersPath () {
        return this._controllersPath;
    }

    get modelsPath () {
        return this._modelsPath;
    }

    /**
     * Run application facade based on configuration settings
     */
    init () {

    }

    run () {

    }
};

module.exports = PagesApp;