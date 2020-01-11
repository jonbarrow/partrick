const GenericObject = require('../object');

class PSwitch extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 18;
	}
}

module.exports = PSwitch;