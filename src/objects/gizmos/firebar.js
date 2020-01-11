const GenericObject = require('../object');

class FireBar extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 24;
	}
}

module.exports = FireBar;