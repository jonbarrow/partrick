const GenericObject = require('../object');

class Pokey extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 78;
	}
}

module.exports = Pokey;