const GenericObject = require('../object');

class PinkCoin extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 92;
	}
}

module.exports = PinkCoin;