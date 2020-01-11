const GenericObject = require('../object');

class Kamek extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 39;
	}
}

module.exports = Kamek;