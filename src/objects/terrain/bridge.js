const GenericObject = require('../object');

class Bridge extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 17;
	}
}

module.exports = Bridge;