const fs = require('fs');
const crypto = require('crypto');
const crc32 = require('buffer-crc32');
const { aesCmac } = require('node-aes-cmac');
const { StreamIn, StreamOut } = require('./streams');
const keyTables = require('./keytables');

const courseMagic = Buffer.from('SCDL');

function decryptFile(input, keyTable) {
	let buffer = input;
	if (typeof input === 'string') {
		buffer = fs.readFileSync(input);
	}

	const stream = new StreamIn(buffer);

	const header = stream.substream(0x10);
	const encrypted = stream.readBytes(0x5BFC0);
	const cryptoConfig = stream.substream(0x30);

	header.skip(0x4); // Header index
	const fileType = header.readBytes(0x2);
	header.skip(0x2); // Course flags
	const crc = header.readBytes(0x4);
	const magic = header.readBytes(0x4);

	if (fileType === 0x10 && courseMagic.compare(magic)) {
		throw new Error(`Invalid course magic. Expected ${courseMagic.toString()}, got ${magic.toString()}`);
	}

	const iv = cryptoConfig.readBytes(0x10);
	const stateSeed = cryptoConfig.readBytes(0x10);
	const cmac = cryptoConfig.readBytes(0x10);

	const rngState = generateState(stateSeed);
	const keyState = generateKeyState(rngState, keyTable);
	const cmacKeyState = generateKeyState(rngState, keyTable);

	const key = generateKey(keyState);
	const cmacKey = generateKey(cmacKeyState);

	const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
	decipher.setAutoPadding(false);

	let decrypted = decipher.update(encrypted);
	decrypted = Buffer.concat([decrypted, decipher.final()]);

	const calculatedCMAC = aesCmac(cmacKey, decrypted, { returnAsBuffer: true });
	if (cmac.compare(calculatedCMAC)) {
		throw new Error(`Invalid AES-CMAC. Expected ${ cmac.toString('hex')}, got ${calculatedCMAC.toString('hex')}`);
	}

	const calculatedCRC = crc32(decrypted).swap32();
	if (crc.compare(calculatedCRC)) {
		throw new Error(`Invalid CRC32. Expected ${ crc.toString('hex')}, got ${calculatedCRC.toString('hex')}`);
	}

	return decrypted;
}

function encryptFile(input, fileType, keyTable) {
	let buffer = input;
	if (typeof input === 'string') {
		buffer = fs.readFileSync(input);
	}

	const iv = crypto.randomBytes(16);
	const stateSeed = crypto.randomBytes(16);

	const rngState = generateState(stateSeed);
	const keyState = generateKeyState(rngState, keyTable);
	const cmacKeyState = generateKeyState(rngState, keyTable);

	const key = generateKey(keyState);
	const cmacKey = generateKey(cmacKeyState);

	const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
	cipher.setAutoPadding(false);

	let encrypted = cipher.update(buffer);
	encrypted = Buffer.concat([ encrypted, cipher.final() ]);

	const cmac = aesCmac(cmacKey, buffer, { returnAsBuffer: true });

	const stream = new StreamOut();

	stream.writeUInt32LE(0x1);            // Header index
	stream.writeUInt16LE(fileType);       // File type being encrypted
	stream.writeUInt16LE(0x0);            // Flags; 0=Edited, 1=New
	stream.write(crc32(buffer).swap32());
	stream.write(fileType === 0x10 ? courseMagic : buffer.alloc(4));
	stream.write(encrypted);
	stream.write(iv);
	stream.write(stateSeed);
	stream.write(cmac);

	return stream.data();
}

function decryptCourse(input, out) {
	const decrypted = decryptFile(input, keyTables.course);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function encryptCourse(input, out) {
	const encrypted = encryptFile(input, 0x10, keyTables.course);

	if (out) {
		fs.writeFileSync(out, encrypted);
	}

	return encrypted;
}

/*
	generateState, generateKeyState and generateKey
	are all part of the ENL key derivation
*/

function generateState(stateSeed) {

	const int1 = stateSeed.readUInt32LE(0x0);
	const int2 = stateSeed.readUInt32LE(0x4);
	const int3 = stateSeed.readUInt32LE(0x8);
	const int4 = stateSeed.readUInt32LE(0xC);

	return (int1|int2|int3|int4) ? [int1, int2, int3, int4] : [1, 0x6C078967, 0x714ACB41, 0x48077044];
}

function generateKeyState(state, keyTable) {
	function generateRand(state) {	
		let n = state[0] ^ state[0] << 11;
		n ^= (n >>> 8) ^ state[3] ^ (state[3] >>> 19);
	
		state[0] = state[1];
		state[1] = state[2];
		state[2] = state[3];
		state[3] = n;
	
		return n;
	}

	const key = [];

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			key[i] <<= 8;
			key[i] |= (keyTable[generateRand(state) >>> 26] >> ((generateRand(state) >>> 27) & 24)) & 0xFF;
		}
	}

	return key;
}

function generateKey(keyState) {
	const key = [];

	for (const int of keyState) {
		key.push(int & 0x000000ff);
		key.push((int & 0x0000ff00) >> 8);
		key.push((int & 0x00ff0000) >> 16);
		key.push((int & 0xff000000) >> 24);
	}

	return Buffer.from(key);
}

module.exports = {
	decryptCourse,
	encryptCourse
};