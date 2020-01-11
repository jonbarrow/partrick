const GenericObject = require('../object');

class FishBones extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 103;
	}
}

module.exports = FishBones;