var dest = './build';
var src = './src';

module.exports = {
  'scripts': {
    'src': src + '/js/*.js',
    'dest': dest
  },
  'browserSync': {
    'dest': dest
  },
  'browserify': {
    'src': [src + '/js/**/*.js', src + '/js/*.js'],
    'dest': dest,
    'outputName': 'bundled.js'
  },
  'views': {
    'src': src + '/*.html',
    'dest': dest
  },
  'styles': {
    'src': src + '/**/*.{scss,sass}',
    'dest': dest + '/css',
    'outputName': 'main-dev.css'
  },
  'template': {
    'src': src + '/js/templates/*.tpl'
  },
  'images' : {
    'src' : src + '/img/**',
    'dest': dest + '/img'
  },
  'build': {
    'cssSrc' : dest + '/css/main-dev.css',
    'jsSrc': dest + '/bundled.js',
    'dest': dest
  }
};