// This object represents either both Bowser and Meowser
// Meowser is never used by this program as 3D World is not supported

const GenericObject = require('../object');

class Bowser extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 62;
	}
}

module.exports = Bowser;