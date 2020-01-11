const GenericObject = require('../object');

class Claw extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 105;
	}
}

module.exports = Claw;