const GenericObject = require('../object');

class Burner extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 54;
	}
}

module.exports = Burner;