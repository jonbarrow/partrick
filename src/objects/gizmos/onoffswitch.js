const GenericObject = require('../object');

class OnOffSwitch extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 99;
	}
}

module.exports = OnOffSwitch;