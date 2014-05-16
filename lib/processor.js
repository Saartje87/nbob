/*jshint node:true, strict:false*/

function Processor() {
}

var proto = Processor.prototype;

proto.init = function(config, log) {
	this.config = config;
	this.log = log;
};

// Returns an array of Batch instances
proto.getBatches = function(/* inputPaths */) {
	throw new Error('getBatches function undefined');
};

// TODO: Refactor to pass (inputFiles, batch) and return outputFiles? (if that turns out to be more convenient)
// Returns a Promise of outputFileMap matching batch.outputPaths
// Note: You must immediately call file.setBuffer(bufferPromise) on any files you wish to change
// That way any following processors will use your changed buffer instead of the original as input
proto.process = function(/* batch, inputFileMap */) {
	throw new Error('process function undefined');
};

module.exports = Processor;