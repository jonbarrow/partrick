const GenericObject = require('../object');

class Boo extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 41;
	}
}

module.exports = Boo;