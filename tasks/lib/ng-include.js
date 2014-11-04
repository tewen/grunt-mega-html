'use strict';

(function () {
    var cheerio = require('cheerio'),
        path = require('path'),
        _ = require('lodash-node');

    function checkSrc(grunt, src) {
        if (!src.match(/^'.*'$/g)) {
            grunt.fail.warn('Non string ng-include path my/file.html found, please check your html before building with grunt-mega-html.');
        } else if (!src.match(/\.html'$/g)) {
            grunt.fail.warn('Non html ng-include path my/file found, please check your html before building with grunt-mega-html.');
        }
        return src.replace(/^'|'$/g, '');
    }

    function ngInclude(grunt, basePath, findViewHtml) {
        basePath = basePath || '';
        var $ = cheerio.load(findViewHtml);

        //Iterate through ng-include elements
        $('ng-include').each(function () {
            var mySelf = $(this);
            mySelf.replaceWith(grunt.file.read(path.join(basePath, checkSrc(grunt, mySelf.attr('src')))));
        });

        //Iterate through ng-include attributes
        $("[ng-include]").each(function () {
            var mySelf = $(this);
            mySelf.replaceWith(grunt.file.read(path.join(basePath, checkSrc(grunt, mySelf.attr('ng-include')))));
        });

        //Recursive call to find more templates
        if ($('ng-include').length || $("[ng-include]").length) {
            return ngInclude(grunt, basePath, $.html());
        } else {
            return $.html();
        }
    }

    module.exports = ngInclude;
})();