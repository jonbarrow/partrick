const GenericObject = require('../object');

class Ground extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 7;
	}
}

module.exports = Ground;