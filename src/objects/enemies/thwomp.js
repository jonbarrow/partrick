const GenericObject = require('../object');

class Thwomp extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 12;
	}
}

module.exports = Thwomp;