'use strict';

var grunt = require('grunt'),
    expect = require("expect.js"),
    sinon = require('sinon'),
    path = require('path'),
    exec = require('child_process').exec;

describe("grunt megaHtml task", function () {

    beforeEach(function () {
        sinon.stub(path, 'resolve').returns("resolved/path");
        sinon.stub(grunt.file, 'read', function (val) {
            return {
                'my/index.html': '<html></html>',
                'some/path/form.html': '<form></form>'
            }[val];
        });
        sinon.spy(grunt.file, 'write');
        sinon.spy(grunt.log, 'writeln');
        grunt.initConfig('megaHtml', {
            dist: {
                options: {
                    basePath: 'some/base'
                },
                ngView: 'some/path/form.html',
                src: 'my/index.html',
                dest: 'dist/index.html'
            }
        });
    });

    afterEach(function () {
        path.resolve.restore();
        grunt.file.read.restore();
        grunt.file.write.restore();
        grunt.log.writeln.restore();
    });

    it("Should run the task with the expected goodness", function () {
        exec('grunt megaHtml', function () {
            expect(grunt.file.read.calledTwice).to.be(true);
            expect(grunt.file.write.calledOnce).to.be(true);
            expect(grunt.log.writeln.calledOnce).to.be(true);
        });
    });

    it("Should run the specific task if necessary", function () {
        exec('grunt megaHtml:dist', function () {
            expect(grunt.file.read.calledTwice).to.be(true);
            expect(grunt.file.write.calledOnce).to.be(true);
            expect(grunt.log.writeln.calledOnce).to.be(true);
        });
    });

    it("Should be fine without a basePath", function () {
        grunt.config('megaHtml.options.basePath', undefined);
        exec('grunt megaHtml', function () {
            expect(grunt.file.read.calledTwice).to.be(true);
            expect(grunt.file.write.calledOnce).to.be(true);
            expect(grunt.log.writeln.calledOnce).to.be(true);
        });
    });

});
