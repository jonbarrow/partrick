const GenericObject = require('../object');

class IceBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 63;
	}
}

module.exports = IceBlock;