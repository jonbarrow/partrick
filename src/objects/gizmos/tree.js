const GenericObject = require('../object');

class Tree extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 106;
	}
}

module.exports = Tree;