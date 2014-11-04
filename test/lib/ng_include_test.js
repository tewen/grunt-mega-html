'use strict';

var grunt = require('grunt'),
    expect = require("expect.js"),
    sinon = require('sinon'),
    ngInclude = require('../../tasks/lib/ng_include');

describe("ng_include helper library", function () {
    var mockGrunt, fragment;

    beforeEach(function () {
        fragment = "<p><label>This is an html fragment</label></p>";
        mockGrunt = {
            file: {
                read: sinon.stub().returns(fragment)
            },
            fail: {
                warn: sinon.spy()
            }
        };
    });

    it("Should be able to take a base path for the files", function () {
        ngInclude(mockGrunt, 'some/base/path', '<body><div><ng-include src="\'my/file.html\'"></ng-include></div></body>');
        expect(mockGrunt.file.read.calledWith('some/base/path/my/file.html')).to.be(true);
    });



    describe("ng-include element", function () {
        it("Should have a warning failure if the src is not html", function () {
            ngInclude(mockGrunt, undefined, '<body><div><ng-include src="\'my/file\'"></ng-include></div></body>');
            expect(mockGrunt.fail.warn.calledWith("Non html ng-include path my/file found, please check your html before building with grunt-mega-html.")).to.be(true);
        });

        it("Should have a warning failure if the src is not a string", function () {
            ngInclude(mockGrunt, undefined, '<body><div><ng-include src="my/file.html"></ng-include></div></body>');
            expect(mockGrunt.fail.warn.calledWith("Non string ng-include path my/file.html found, please check your html before building with grunt-mega-html.")).to.be(true);
        });

        it("Should replace by going out and finding the template", function () {
            expect(ngInclude(mockGrunt, undefined, '<body><div><ng-include src="\'my/file.html\'"></ng-include></div></body>')).to.be('<body><div>' + fragment + '</div></body>');
            expect(mockGrunt.file.read.calledWith('my/file.html')).to.be(true);
        });

        it("Should replace by going out and finding the template and play nice with self closing tags", function () {
            expect(ngInclude(mockGrunt, undefined, '<body><div><ng-include src="\'my/file.html\'" /></div></body>')).to.be('<body><div>' + fragment + '</div></body>');
            expect(mockGrunt.file.read.calledWith('my/file.html')).to.be(true);
        });

        it("Should be able to recurse downward into templates", function () {
            mockGrunt.file.read.onCall(0).returns('<div><a>Some Text Here</a><ng-include src="\'my/other/sub/template.html\'"></ng-include></div>');
            mockGrunt.file.read.onCall(1).returns(fragment);
            expect(ngInclude(mockGrunt, undefined, '<body><div><ng-include src="\'my/file.html\'" /></div></body>')).to.be('<body><div><div><a>Some Text Here</a>' + fragment + '</div></div></body>');
            expect(mockGrunt.file.read.calledWith('my/file.html')).to.be(true);
            expect(mockGrunt.file.read.calledWith('my/other/sub/template.html')).to.be(true);
        });
    });

    describe("ng-include attribute", function () {
        it("Should have a warning failure if the src is not html", function () {
            ngInclude(mockGrunt, undefined, '<body><div><div ng-include="\'my/file\'"></div></div></body>');
            expect(mockGrunt.fail.warn.calledWith("Non html ng-include path my/file found, please check your html before building with grunt-mega-html.")).to.be(true);
        });

        it("Should have a warning failure if the src is not a string", function () {
            ngInclude(mockGrunt, undefined, '<body><div><p ng-include="my/file.html"></p></div></body>');
            expect(mockGrunt.fail.warn.calledWith("Non string ng-include path my/file.html found, please check your html before building with grunt-mega-html.")).to.be(true);
        });

        it("Should replace by going out and finding the template", function () {
            expect(ngInclude(mockGrunt, undefined, '<body><div><div ng-include="\'my/file.html\'"></div></div></body>')).to.be('<body><div>' + fragment + '</div></body>');
            expect(mockGrunt.file.read.calledWith('my/file.html')).to.be(true);
        });

        it("Should replace by going out and finding the template in another element", function () {
            expect(ngInclude(mockGrunt, undefined, '<body><div><p ng-include="\'my/file.html\'"></p></div></body>')).to.be('<body><div>' + fragment + '</div></body>');
            expect(mockGrunt.file.read.calledWith('my/file.html')).to.be(true);
        });

        it("Should be able to recurse downward into templates", function () {
            mockGrunt.file.read.onCall(0).returns('<div><a>Some Text Here</a><label ng-include="\'my/sub/template.html\'"></label></div>');
            mockGrunt.file.read.onCall(1).returns(fragment);
            expect(ngInclude(mockGrunt, undefined, '<body><div><img ng-include="\'my/file.html\'" /></div></body>')).to.be('<body><div><div><a>Some Text Here</a>' + fragment + '</div></div></body>');
            expect(mockGrunt.file.read.calledWith('my/file.html')).to.be(true);
            expect(mockGrunt.file.read.calledWith('my/sub/template.html')).to.be(true);
        });
    });
});