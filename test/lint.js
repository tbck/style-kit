var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var glob = require('glob');
var stylelint = require('stylelint');
var bemLinter = require('postcss-bem-linter');
var reporter = require('postcss-reporter');

var processors = [
  bemLinter({ preset: 'suit' }),
  stylelint(),
  reporter({ clearMessages: true })
];

var files = glob.sync('./lib/**/*.css');

files.forEach(function(file) {
  var stylesheet = fs.readFileSync(file, 'utf8');
  postcss(processors)
    .process(stylesheet, { from: file })
    .then();
});
