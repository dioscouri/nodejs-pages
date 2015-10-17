// Using STRICT mode for ES6 features
"use strict";

global.DEFAULT_CONFIG_PATH = '.env-test';

var DioscouriCore = require('dioscouri-core');

/**
 * Requiring Async operations helper
 *
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 *  Importing Application Facade and run the Application.
 *
 *  @author Eugene A. Kalosha <ekalosha@dioscouri.com>
 */
var applicationFacade = DioscouriCore.ApplicationFacade.instance;

// Redefine default application environment
if (process.env.APPLICATION_ENV == null) {
    process.env.APPLICATION_ENV = 'test';
}

function startAppServer (callback) {
    if (global.appServerInitializationRequested == null) {

        global.appServerInitializationRequested = true;

        console.log('Initializing application server');

        applicationFacade.on(DioscouriCore.ApplicationEvent.MONGO_CONNECTED, function (event) {
            var locals = {};
            console.log('Checking initial data for Admin system');
            async.series([
                    function (asyncCallback){
                        asyncCallback();
                    },
                    function (asyncCallback){
                        asyncCallback();
                    }
                ],
                function (error) {
                    if (error != null) {
                        console.error('ERROR. Failed to initialize Admin tests. ', error.message);
                    }
                    callback();
                });

        }.bind(applicationFacade));

        // Initializing server module
        applicationFacade.load('server', DioscouriCore.HTTPServer);

        // Initializing all modules
        applicationFacade.init();

        /**
         * Loading applications
         */
            // applicationFacade.loadApplications('module-test-config.json');

        applicationFacade.run();
    } else {
        callback();
    }
}


module.exports = {
    startServer: startAppServer
}