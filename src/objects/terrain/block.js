const GenericObject = require('../object');

class Block extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 4;
	}
}

module.exports = Block;