const { StreamOut } = require('../streams');

class GenericObject {
	constructor(stream) {
		this.x = stream.readUInt32LE();
		this.y = stream.readUInt32LE();
		stream.skip(0x2); // Padding
		this.width = stream.readUInt8();
		this.height = stream.readUInt8();
		this.flags = stream.readUInt32LE();
		this.child_flags = stream.readUInt32LE();
		this.extended_data = stream.readBytes(0x4);
		this.type_id = stream.readUInt16LE();
		this.child_type_id = stream.readUInt16LE();
		this.link_id = stream.readUInt16LE();
		this.sound_effect_id = stream.readUInt16LE();
	}

	encode() {
		const stream = new StreamOut();

		stream.writeUInt32LE(this.x);
		stream.writeUInt32LE(this.y);
		stream.write(Buffer.alloc(0x2)); // Padding
		stream.writeUInt8(this.width);
		stream.writeUInt8(this.height);
		stream.writeUInt32LE(this.flags);
		stream.writeUInt32LE(this.child_flags);
		stream.write(this.extended_data);
		stream.writeUInt16LE(this.type_id);
		stream.writeUInt16LE(this.child_type_id);
		stream.writeUInt16LE(this.link_id);
		stream.writeUInt16LE(this.sound_effect_id);

		return stream.data();
	}
}

module.exports = GenericObject;