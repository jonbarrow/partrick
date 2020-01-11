const GenericObject = require('../object');

class Blooper extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 48;
	}
}

module.exports = Blooper;