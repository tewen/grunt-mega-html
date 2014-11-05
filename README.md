# grunt-mega-html

> A plugin for merging all the ng-includes and ng-views into one file.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mega-html --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mega-html');
```

## The "megaHtml" task

### Overview
This plugin has a special and simple use case. By no means would I suggest this as a replacement for [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) or similar initiatives.

This was made for the very simple idea that some basic, single page angular apps are assembled using ng-include syntax for organization. This pulls all the referenced templates into the same file, and delivers a simple (albeit robust) html file.

#### Do not use this plugin if

* Your project is not a single page application.
* Your ng-include sources are variables, not strings in the dom (myTempate vs. 'my/template.html')
* You don't need to.

In your project's Gruntfile, add a section named `megaHtml to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  megaHtml{
    options: {
      basePath: 'some/base/path/to/templates'
    },
    dist: {
      ngView: 'path/to/main/template.html',
      src: 'path/to/index.html',
      dest 'dist/to/index.html'
    },
  },
})
```

### Target

#### target.src
Type: `String`
Default value: `''`

The src file for pulling in all html. Usually an index.html file.


#### target.dest
Type: `String`
Default value: `''`

The destination file written with all the merged html.


#### target.ngView
Type: `String`
Default value: `''`

The template to be placed over the ng-view tag, if such a tag or attribute exists in the index.


### Options

#### options.basePath
Type: `String`
Default value: `''`

The base path for all the ng-include templates. Will be appended to the paths listed in the DOM.


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  megaHtml
    options: {},
    dist: {
      src: 'something/index.html',
      dest: 'dist/index.html'
    },
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  megaHtml
    options: {
      basePath: 'relative/to/templates'
    },
    dist: {
      src: 'something/index.html',
      dest: 'dist/index.html',
      ngView: 'here/is/another/template.html'
    },
  },
})
```

## Contributing
There may be other useful cases for this. Make pull requests, write tests, run tests.

## Release History

0.0.1 (only available on [Github](https://github.com/tewen/grunt-mega-html) for now)
