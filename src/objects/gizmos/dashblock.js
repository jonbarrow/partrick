const GenericObject = require('../object');

class DashBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 80;
	}
}

module.exports = DashBlock;