const GenericObject = require('../object');

class ExpandingBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 119;
	}
}

module.exports = ExpandingBlock;