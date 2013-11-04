module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // connect: {
    //   server: {
    //     options: {
    //       // debug: true,
    //       // base: 'htdocs',
    //       port: 9001,
    //       keepalive: true

    //       // middleware: function(connect, options) {
    //       //   return [
    //       //     lrSnippet,
    //       //     folderMount(connect, 'htdocs')
    //       //   ];
    //       // }
    //     }
    //   }
    // },
    watch: {
      options: {
        livereload: true,
      },
      slim: {
        files: ['src/html/**/*.slim'],
        tasks: ['slim:dist'],
      },
      coffee: {
        files: ['src/js/**/*.coffee'],
        tasks: ['coffee:dist'],
      },
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'htdocs_dev',
            'htdocs',
          ]
        }]
      },
      server: '.tmp'
    },

    slim: { 
      options: {
        pretty: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/html',
          src: ['**/*.slim'],
          dest: 'htdocs_dev/',
          ext: '.html'
        }]
      }
    },

    coffee: {
      options: {
        // sourceMap: true,
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['**/*.coffee'],
          dest: 'htdocs_dev/js/',
          ext: '.js'
        }]
      },
    },




    // --------------------------------------------------
    // for production 
    concat: {
      options: {
        // 連結される各ファイル内の間に配置出力する文字列を定義
        // separator: ';'
      },
      dist: {
        src: 'htdocs_dev/js/**/*.js',
        dest: 'htdocs/js/<%= pkg.name %>.js',
      }
    },

    uglify: {
      dist: {
        src: 'htdocs/js/<%= pkg.name %>.js',
        dest: 'htdocs/js/<%= pkg.name %>.min.js',
      }
    },

  });

  // grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-slim');


  // grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('default', ['watch']);


  // for production 
  grunt.registerTask('build', [
    'clean:dist',
    'slim',
    'coffee',
    'concat',
    'uglify',
  ]);

}
