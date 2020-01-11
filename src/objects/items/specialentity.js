// This can represent either a Yoshi Egg or a Goomba Boot depending on the game mode

const GenericObject = require('../object');

class SpecialEntity extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 45;
	}
}

module.exports = SpecialEntity;