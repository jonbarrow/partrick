const GenericObject = require('../object');

class Bobomb extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 15;
	}
}

module.exports = Bobomb;