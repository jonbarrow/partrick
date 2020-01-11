const GenericObject = require('../object');

class SpikeTrap extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 43;
	}
}

module.exports = SpikeTrap;