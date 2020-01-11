const GenericObject = require('../object');

class NoteBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 23;
	}
}

module.exports = NoteBlock;