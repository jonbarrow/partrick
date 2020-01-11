const GenericObject = require('../object');

class Spiny extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 25;
	}
}

module.exports = Spiny;