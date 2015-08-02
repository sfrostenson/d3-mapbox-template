'use strict';
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                debounceDelay: 1500
            },
            browserify: {
                files: [
                    'js/main.js'
                ],
                tasks: ['browserify:build']
            },
        },

        browserify: {
            build: {
                files: {
                    'js/bundled.js': [
                    'js/main.js'
                    ],
                }
            }
        },

    });

    // TODO create a test here that opens a phantom webserver
    grunt.registerTask('default', ['browserify:build', 'watch']);
}
