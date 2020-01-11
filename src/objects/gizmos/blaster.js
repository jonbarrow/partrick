const GenericObject = require('../object');

class Blaster extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 13;
	}
}

module.exports = Blaster;