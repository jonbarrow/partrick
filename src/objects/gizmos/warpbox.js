const GenericObject = require('../object');

class WarpBox extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 97;
	}
}

module.exports = WarpBox;