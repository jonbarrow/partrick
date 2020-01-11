const GenericObject = require('../object');

class HiddenBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 29;
	}
}

module.exports = HiddenBlock;