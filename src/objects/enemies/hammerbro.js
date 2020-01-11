const GenericObject = require('../object');

class HammerBro extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 3;
	}
}

module.exports = HammerBro;