const GenericObject = require('../object');

class Coin extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 8;
	}
}

module.exports = Coin;