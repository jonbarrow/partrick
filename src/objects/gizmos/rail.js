const GenericObject = require('../object');

class Rail extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 59;
	}
}

module.exports = Rail;