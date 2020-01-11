const GenericObject = require('../object');

class Lift extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 11;
	}
}

module.exports = Lift;