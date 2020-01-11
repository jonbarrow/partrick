const GenericObject = require('../object');

class TrackBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 85;
	}
}

module.exports = TrackBlock;