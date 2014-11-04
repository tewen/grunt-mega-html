'use strict';

(function () {
    var cheerio = require('cheerio');

    module.exports = function (findViewHtml, replaceHtml) {
        replaceHtml = replaceHtml || '';

        //Load the base html, replacement deals with self closing ng-view tags
        var $ = cheerio.load(findViewHtml.replace(/<ng-view\/>|<ng-view\s\/>|<ng-view\s*\/>/g, '<ng-view></ng-view>'));

        //Elements or attributes replaced
        $('ng-view').replaceWith(replaceHtml);
        $("[ng-view]").replaceWith(replaceHtml);

        return $.html();
    };
})();

