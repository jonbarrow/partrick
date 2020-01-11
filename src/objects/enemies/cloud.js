const GenericObject = require('../object');

class Cloud extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 31;
	}
}

module.exports = Cloud;