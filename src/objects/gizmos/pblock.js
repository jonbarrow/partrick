const GenericObject = require('../object');

class PBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 79;
	}
}

module.exports = PBlock;