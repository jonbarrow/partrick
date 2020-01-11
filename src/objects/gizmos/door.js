const GenericObject = require('../object');

class Door extends GenericObject {
	constructor(stream) {
		super(stream);
		
		this.object_id = 55;

		this.p_door = !!(this.flags & 0x40000);
		this.key_door = !!(this.flags & 0x80000);

		this.is_link_id_0 = !!(this.flags & 0x100000);
		this.is_link_id_1 = !!(this.flags & 0x200000);
		this.is_link_id_2 = !!(this.flags & 0x400000);
		this.is_link_id_3 = !!(this.flags & 0x800000);
		this.is_link_id_4 = !!(this.flags & 0xC00000);
		this.is_link_id_5 = !!(this.flags & 0x1800000);
		this.is_link_id_6 = !!(this.flags & 0x3000000);
		this.is_link_id_7 = !!(this.flags & 0x6000000);
	}
}

module.exports = Door;