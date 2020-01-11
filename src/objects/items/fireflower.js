const GenericObject = require('../object');

class FireFlower extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 34;
	}
}

module.exports = FireFlower;