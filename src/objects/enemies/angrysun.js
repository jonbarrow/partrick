const GenericObject = require('../object');

class AngrySun extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 104;
	}
}

module.exports = AngrySun;