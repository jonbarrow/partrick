const GenericObject = require('../object');

class Conveyor extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 53;
	}
}

module.exports = Conveyor;