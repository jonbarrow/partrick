class StreamIn {
	constructor(buffer) {
		this.position = 0;
		this.buffer = buffer;
	}

	substream(len) {
		const read = this.read(len);

		return new StreamIn(read);
	}

	data() {
		return this.buffer;
	}

	seek(pos) {
		this.position = pos;
	}

	skip(len) {
		this.seek(this.position + len);
	}

	read(len) {
		const read = this.buffer.subarray(this.position, this.position + len);
		this.position += len;

		return read;
	}

	readBytes(len) {
		return this.read(len);
	}

	readByte() {
		return this.readBytes(1)[0];
	}

	readUInt8() {
		return this.readBytes(1).readUInt8();
	}

	readUInt16LE() {
		return this.readBytes(2).readUInt16LE();
	}

	readUInt32LE() {
		return this.readBytes(4).readUInt32LE();
	}
}

// This could probably be better
class StreamOut {
	constructor() {
		this.chunks = [];
	}

	data() {
		return Buffer.concat(this.chunks);
	}

	write(buffer) {
		this.chunks.push(buffer);
	}

	writeUInt8(value) {
		const buffer = Buffer.alloc(1);
		buffer.writeUInt8(value);

		this.write(buffer);
	}

	writeUInt16LE(value) {
		const buffer = Buffer.alloc(2);
		buffer.writeUInt16LE(value);

		this.write(buffer);
	}

	writeUInt32LE(value) {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(value);

		this.write(buffer);
	}
}


module.exports = {
	StreamIn,
	StreamOut
};