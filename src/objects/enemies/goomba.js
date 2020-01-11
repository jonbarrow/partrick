// This object represents either a Goomba or a Galoomba

const GenericObject = require('../object');

class Goomba extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 0;
	}
}

module.exports = Goomba;