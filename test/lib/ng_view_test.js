'use strict';

var grunt = require('grunt'),
    expect = require("expect.js"),
    ngView = require('../../tasks/lib/ng_view');

describe("ng_view helper library", function () {
    var myHtml, replacement;

    beforeEach(function () {
        replacement = '<div><label>This is something!</label></div>';
    });

    describe("ng-view element", function () {
        beforeEach(function () {
            myHtml = '<body><div><ng-view></ng-view><a href="something/here/path.html"></a></div></body>';
        });

        it("Should insert the new html in the place of the existing ng-view tags", function () {
            expect(ngView(myHtml, replacement)).to.be('<body><div><div><label>This is something!</label></div><a href="something/here/path.html"></a></div></body>');
        });

        it("Should play fine with a self closing tag", function () {
            myHtml = '<body><div><ng-view /><a href="something/here/path.html"></a></div></body>';
            expect(ngView(myHtml, replacement)).to.be('<body><div><div><label>This is something!</label></div><a href="something/here/path.html"></a></div></body>');
        });

        it("Should play okay with a blank string", function () {
            expect(ngView(myHtml, '')).to.be('<body><div><a href="something/here/path.html"></a></div></body>');
        });

        it("Should treat undefined like a blank string", function () {
            expect(ngView(myHtml, undefined)).to.be('<body><div><a href="something/here/path.html"></a></div></body>');
        });

        it("Should treat null like a blank string", function () {
            expect(ngView(myHtml, null)).to.be('<body><div><a href="something/here/path.html"></a></div></body>');
        });
    });

    describe("ng-view attribute", function () {
        beforeEach(function () {
            myHtml = '<body><div><p>My text</p><div ng-view></div></div></body>';
        });

        it("Should insert the new html in the place of the existing ng-view tags", function () {
            expect(ngView(myHtml, replacement)).to.be('<body><div><p>My text</p><div><label>This is something!</label></div></div></body>');
        });

        it("Should play alright with a self closing dom tag", function () {
            myHtml = '<body><div><p>My text</p><img ng-view/></div></body>';
            expect(ngView(myHtml, replacement)).to.be('<body><div><p>My text</p><div><label>This is something!</label></div></div></body>');
        });

        it("Should play alright with tags that do not even close but are single", function () {
            myHtml = '<body><div><p>My text</p><img ng-view></div></body>';
            expect(ngView(myHtml, replacement)).to.be('<body><div><p>My text</p><div><label>This is something!</label></div></div></body>');
        });

        it("Should play nice with another variety of dom element", function () {
            myHtml = '<body><div><p ng-view></p></div></body>';
            expect(ngView(myHtml, replacement)).to.be('<body><div><div><label>This is something!</label></div></div></body>');
        });

        it("Should play okay with a blank string", function () {
            expect(ngView(myHtml, '')).to.be('<body><div><p>My text</p></div></body>');
        });

        it("Should treat undefined like a blank string", function () {
            expect(ngView(myHtml, undefined)).to.be('<body><div><p>My text</p></div></body>');
        });

        it("Should treat null like a blank string", function () {
            expect(ngView(myHtml, null)).to.be('<body><div><p>My text</p></div></body>');
        });
    });

});