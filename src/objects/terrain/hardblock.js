const GenericObject = require('../object');

class HardBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 6;
	}
}

module.exports = HardBlock;