const GenericObject = require('../object');

class Seasaw extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 91;
	}
}

module.exports = Seasaw;