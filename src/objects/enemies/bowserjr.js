const GenericObject = require('../object');

class BowserJr extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 98;
	}
}

module.exports = BowserJr;