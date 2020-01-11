const GenericObject = require('../object');

class OneUp extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 33;
	}
}

module.exports = OneUp;