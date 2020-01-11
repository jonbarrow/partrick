const GenericObject = require('../object');

class BoomBoom extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 77;
	}
}

module.exports = BoomBoom;