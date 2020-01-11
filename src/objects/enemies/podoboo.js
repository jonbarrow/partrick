const GenericObject = require('../object');

class Podoboo extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 60;
	}
}

module.exports = Podoboo;