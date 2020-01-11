const GenericObject = require('../object');

class CloudBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 22;
	}
}

module.exports = CloudBlock;