const GenericObject = require('../object');

class Twister extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 76;
	}
}

module.exports = Twister;