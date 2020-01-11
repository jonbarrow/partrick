const GenericObject = require('../object');

class Spike extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 74;

		this.is_ball = !!(this.flags & 0x4);
	}
}

module.exports = Spike;