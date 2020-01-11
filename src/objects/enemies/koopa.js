const GenericObject = require('../object');

class Koopa extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 1;
	}
}

module.exports = Koopa;