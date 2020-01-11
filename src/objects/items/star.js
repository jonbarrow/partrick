const GenericObject = require('../object');

class Star extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 35;
	}
}

module.exports = Star;