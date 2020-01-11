const GenericObject = require('../object');

class Muncher extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 57;
	}
}

module.exports = Muncher;