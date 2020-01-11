const GenericObject = require('../object');

class PowBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 19;
	}
}

module.exports = PowBlock;