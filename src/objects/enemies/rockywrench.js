const GenericObject = require('../object');

class RockyWrench extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 58;
	}
}

module.exports = RockyWrench;