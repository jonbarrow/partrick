const GenericObject = require('../object');

class Crate extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 112;
	}
}

module.exports = Crate;