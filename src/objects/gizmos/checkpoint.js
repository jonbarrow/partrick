const GenericObject = require('../object');

class Checkpoint extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 90;
	}
}

module.exports = Checkpoint;