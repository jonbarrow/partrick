// This object can represent
//    - Big Mushroom
//    - Super Leaf
//    - Cape Feather
//    - Propeller Mushroom
// Which object is represented is determined by the game style

const GenericObject = require('../object');

class PowerUp extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 44;
	}
}

module.exports = PowerUp;