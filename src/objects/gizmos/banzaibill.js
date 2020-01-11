const GenericObject = require('../object');

class BanzaiBill extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 32;
	}
}

module.exports = BanzaiBill;