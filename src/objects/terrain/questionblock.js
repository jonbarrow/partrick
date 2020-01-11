const GenericObject = require('../object');

class QuestionBlock extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 5;
	}

	setItem(id, flags=100663360) {
		this.child_type_id = id;
		this.child_flags = flags;
	}
}

module.exports = QuestionBlock;