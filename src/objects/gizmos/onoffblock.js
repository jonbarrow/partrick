const GenericObject = require('../object');

class OnOffBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 100;
	}
}

module.exports = OnOffBlock;