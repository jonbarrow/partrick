const GenericObject = require('../object');

class Trampoline extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 10;
	}
}

module.exports = Trampoline;