const GenericObject = require('../object');

class SnakeBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 84;
	}
}

module.exports = SnakeBlock;