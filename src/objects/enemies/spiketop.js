const GenericObject = require('../object');

class SpikeTop extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 40;
	}
}

module.exports = SpikeTop;