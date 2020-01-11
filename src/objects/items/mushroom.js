const GenericObject = require('../object');

class Mushroom extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 20;
	}
}

module.exports = Mushroom;