const GenericObject = require('../object');

class Wiggler extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 52;
	}
}

module.exports = Wiggler;