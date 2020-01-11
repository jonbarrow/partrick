const GenericObject = require('../object');

class ChainChomp extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 61;
	}
}

module.exports = ChainChomp;