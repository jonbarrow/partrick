const GenericObject = require('../object');

class Bumper extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 82;
	}
}

module.exports = Bumper;