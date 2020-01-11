const GenericObject = require('../object');

class Grinder extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 68;
	}
}

module.exports = Grinder;