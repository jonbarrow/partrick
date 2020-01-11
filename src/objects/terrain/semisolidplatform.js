const GenericObject = require('../object');

class SemisolidPlatform extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 16;
	}
}

module.exports = SemisolidPlatform;