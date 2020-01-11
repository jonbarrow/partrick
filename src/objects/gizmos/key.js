const GenericObject = require('../object');

class Key extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 95;
	}
}

module.exports = Key;