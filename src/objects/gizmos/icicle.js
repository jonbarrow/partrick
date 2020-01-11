const GenericObject = require('../object');

class Icicle extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 118;
	}
}

module.exports = Icicle;