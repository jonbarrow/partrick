// UNUSED
// 3D World courses are not supported and likely never will be
// This exists soley for if I ever do add 3D World support

const GenericObject = require('../object');

class ClearPipe extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 93;
	}
}

module.exports = ClearPipe;