const GenericObject = require('../object');

class Pipe extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 9;
	}
}

module.exports = Pipe;