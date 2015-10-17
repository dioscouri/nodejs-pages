// Using STRICT mode for ES6 features
"use strict";

// Requiring core assert
var assert = require('assert');

/**
 * Requiring init script for main nodejs-lib
 *
 * @type {exports|module.exports}
 * @private
 */
var _init = require('./common/_init.js');

/**
 * Requiring path utils
 * @type {*}
 */
var path = require('path');

// Requiring main nodejs-core lib
var DioscouriCore = require('dioscouri-core');

describe('Bootstrap', function () {

    before(function(done){
        // Set max timeout to 5 sec. As it may take more then 2 secs to run host server
        this.timeout(5000);

        _init.startServer(function () {
            done();
        })
    });

    // Describing initial loading
    describe('init', function () {

        var BootstrapLoader;
        var loader;

        //console.log = function(){};

        // Controllers initialization test
        it('Initializing loader - nodejs-admin', function (done) {
            BootstrapLoader = require('nodejs-admin');
            loader = new BootstrapLoader();
            loader.init();
            loader.run();
            loader.bootstrap();
            done();
        });

        // Controllers initialization test
        it('Initializing loader - nodejs-pages', function (done) {
            BootstrapLoader = require('../index.js');
            loader = new BootstrapLoader();
            loader.init();
            loader.run();
            loader.bootstrap();
            done();
        });

        // Controllers initialization test
        it('Controllers must be initialized', function (done) {
            assert.notEqual(BootstrapLoader.Pages.Controllers, null);
            assert.notEqual(BootstrapLoader.Pages.Controllers.Admin, null);
            assert.notEqual(BootstrapLoader.Pages.Controllers.Admin.Index, null);
            assert.notEqual(BootstrapLoader.Pages.Controllers.Front, null);
            assert.notEqual(BootstrapLoader.Pages.Controllers.Front.Index, null);
            done();
        });

        // Models initialization test
        it('Models must be initialized', function (done) {
            assert.notEqual(BootstrapLoader.Pages.Models, null);
            assert.notEqual(BootstrapLoader.Pages.Models.Page, null);
            assert.notEqual(BootstrapLoader.Pages.Models.Category, null);
            done();
        });


        // Controllers registry test
        it('Controllers must be exported to Registry', function (done) {
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Controllers.Admin.Index'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Controllers.Front.Index'), null);
            done();
        });

        // Models initialization test
        it('Models must be initialized', function (done) {
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Page'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Category'), null);
            done();
        });

    });
});