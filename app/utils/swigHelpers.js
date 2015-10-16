// Using STRICT mode for ES6 features
"use strict";

var _ = require('lodash');

/**
 *  Helper function for prepare object for swig template
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class SwigHelpers {

    /**
     * Create parent-children structure for page categories
     * @param array
     * @param parent
     * @param tree
     * @returns {*}
     */
    static createCategorieTree(array, parent, tree ){
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
            _.each( children, function( child ){ SwigHelpers.createCategorieTree( array, child ) } );
        }

        return tree;
    }
}

/**
 * Exporting SwigHelpers util
 *
 * @type {Function}
 */
exports = module.exports = SwigHelpers;