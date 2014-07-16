'use strict';

var Batch = require('../batch');
var Processor = require('../processor');

var processor = new Processor();

processor.getBatches = function(inputPaths) {
	return inputPaths.map(function(inputPath) {
		return new Batch([ inputPath ], [ inputPath ]);
	});
};

processor.process = function(inputs, outputs) {
	var log = this.log;
	var substitutes = this.config.substitutes;
	var input = inputs[0];
	var output = outputs[0];
	var text = input.data.replace(/__(.+?)__/g, function(match, key) {
		var value = substitutes[key];
		if (value === undefined) {
			return match;
		}
		log.debug('%s replacing %s by %s', input.path, match, value);
		return value;
	});
	output.resolve(text);
};

module.exports = processor;