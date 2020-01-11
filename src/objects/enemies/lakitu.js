const GenericObject = require('../object');

class Lakitu extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 30;
	}
}

module.exports = Lakitu;