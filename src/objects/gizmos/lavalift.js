const GenericObject = require('../object');

class LavaLift extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 36;
	}
}

module.exports = LavaLift;