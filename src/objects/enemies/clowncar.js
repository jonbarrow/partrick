const GenericObject = require('../object');

class ClownCar extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 42;
	}
}

module.exports = ClownCar;