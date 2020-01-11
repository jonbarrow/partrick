const GenericObject = require('../object');

class ArrowSign extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 66;
	}
}

module.exports = ArrowSign;