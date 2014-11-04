/*
 * grunt-mega-html
 * https://github.com/tewen/grunt-mega-html
 *
 * Copyright (c) 2014 Trevor Ewen
 * Licensed under the MIT license.
 */

'use strict';

(function () {
    var ngView = require("./lib/ng_view"),
        ngInclude = require("./lib/ng_include"),
        path = require('path');

    module.exports = function(grunt) {

        // Please see the Grunt documentation for more information regarding task
        // creation: http://gruntjs.com/creating-tasks

        grunt.registerMultiTask('mega_html', 'A plugin for merging all the ng-includes and ng-views into one file.', function() {
            var baseHtml = grunt.file.read(path.resolve(this.data.src));

            //ngView
            baseHtml = ngView(baseHtml, grunt.file.read(this.data.ngView));

            //ngInclude
            baseHtml = ngInclude(grunt, this.options().basePath, baseHtml);

            //Write file
            var resolvedDestination = path.resolve(this.data.dest);
            grunt.file.write(resolvedDestination, baseHtml);
            grunt.log.writeln('New file created at: ' + resolvedDestination);
        });

    };
})();


