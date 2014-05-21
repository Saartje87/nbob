'use strict';

var path = require('path');
var _ = require('lodash');
var Processor = require('../processor');
var minimatches = require('../minimatches');
var Batch = require('../batch');

var processor = new Processor();

processor.getBatches = function(inputPaths) {
	inputPaths = minimatches(inputPaths, this.config.files);
	var dirs = _.uniq(inputPaths.map(path.dirname));
	return dirs.map(function(dir) {
		var paths = inputPaths.filter(function(inputPath) {
			return inputPath.indexOf(dir) === 0;
		});
		return new Batch(paths, [ dir + '.json' ]);
	});
};

processor.process = function(inputs, outputs) {
	var ext = this.config.ext;
	var texts = _.pluck(inputs, 'data');
	var map = _.transform(texts, function(map, text, i) {
		map[path.basename(inputs[i].path, ext)] = text;
	}, {});
	outputs[0].resolve(JSON.stringify(map, null, '\t'));
};

module.exports = processor;