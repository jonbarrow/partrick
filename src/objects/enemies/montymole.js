const GenericObject = require('../object');

class MontyMole extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 102;
	}
}

module.exports = MontyMole;