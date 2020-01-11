const GenericObject = require('../object');

class PiranhaPlant extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 2;
	}
}

module.exports = PiranhaPlant;