// This object represents 10 coins, 30 coins and 50 coins

const GenericObject = require('../object');

class MultiCoin extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 70;
	}
}

module.exports = MultiCoin;