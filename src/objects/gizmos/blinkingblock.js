const GenericObject = require('../object');

class BlinkingBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 108;
	}
}

module.exports = BlinkingBlock;