const GenericObject = require('../object');

class DonutBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 21;
	}
}

module.exports = DonutBlock;