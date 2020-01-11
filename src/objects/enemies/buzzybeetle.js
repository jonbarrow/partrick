const GenericObject = require('../object');

class BuzzyBeetle extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 28;
	}
}

module.exports = BuzzyBeetle;