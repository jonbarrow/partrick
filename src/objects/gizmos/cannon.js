const GenericObject = require('../object');

class Cannon extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 47;
	}
}

module.exports = Cannon;