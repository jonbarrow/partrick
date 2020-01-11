const GenericObject = require('../object');

class CheepCheep extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 56;
	}
}

module.exports = CheepCheep;