const GenericObject = require('../object');

class DryBones extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 46;
	}
}

module.exports = DryBones;