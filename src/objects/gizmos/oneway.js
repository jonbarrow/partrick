const GenericObject = require('../object');

class OneWay extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 67;
	}
}

module.exports = OneWay;