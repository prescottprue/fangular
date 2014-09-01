module.exports = function(grunt) {
    var rootFolder = './src';
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('wire', [ 'wiredep' ]);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Trying for storing variables else where,
        connect: {
            server: {
                options: {
                    port: 8000,
                    //keepalive: true, keeping grunt running
                    //livereload:true,
                    base: rootFolder + '/',
                    open: {
                        target: 'http://localhost:8000',
                        appName: 'Google Chrome',
                    }
                }
            }
        },
        //wire bower dependencies
        wiredep: {
          target: {
            // updated when running `grunt wiredep`
            src: [
              rootFolder + '/index.html'
            ],
            dependencies: true,
            devDependencies: true
          }
        },
        less: {
            style: {
                files: {
                    "src/css/styles.css": "./less/styles.less"
                },
            }
        },
        watch: {
            less: {
                files: ["./less/*.less"],
                tasks: ["less:style"],
                options:{
                    //debounceDelay:1000,
                    livereload: true
                }
            },
            bower:{
                files:['./bower.json'],
                // tasks: ['wire'],
                options:{
                    livereload: true
                }
            },
            html: {
                files: [rootFolder + '/index.html'],
                options: {
                    livereload: true
                }
            }
        },
        open:{
          cat:{
          path:"https://trigger.io/catalyst/client/#EA3E3BBD-C54D-4ECA-8FA9-6764B62E84F0",
          app: "Google Chrome"
          }
        }

    });

    //Plugin for "watch"
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Connect plugin
    grunt.loadNpmTasks('grunt-contrib-connect');

    //Open plugin
    grunt.loadNpmTasks('grunt-open');

    //Less Plugin
    grunt.loadNpmTasks('grunt-contrib-less');

    //Wire bower dependencies plugin
    grunt.loadNpmTasks('grunt-wiredep');

    // Default task(s).
    grunt.registerTask('default', ['connect', 'less', 'watch']);

    //Forge Tasks
    grunt.registerTask('forge', ['open', 'less', 'watch']);

    grunt.registerTask('serve', ['connect'], function() {
        grunt.task.run('connect');
    });
};
