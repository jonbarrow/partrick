const GenericObject = require('../object');

class Vine extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 64;
	}
}

module.exports = Vine;