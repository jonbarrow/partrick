const { StreamIn, StreamOut } = require('./streams');
const objectClassList = require('./objects');
const GenericObject = require('./objects/object');

class Course {
	constructor(input) {
		// Raw data buffer
		this.data = input.data ? input.data : input; // Check if passing in an object sent from the Electron renderer because I'm LAZY
		
		// Initial values

		// Header
		
		this.start_y = 0;
		this.goal_y = 0;
		this.goal_x = 0;
		this.time_limit = 0;
		this.clear_condition_count = 0;
		this.saved_year = 0;
		this.saved_month = 0;
		this.saved_day = 0;
		this.saved_hour = 0;
		this.saved_minute = 0;
		this.autoscroll_speed = 0;
		this.clear_condition_category = 0;
		this.clear_condition_crc = null;
		this.game_version = 0;
		this.management_flags = 0;
		this.clear_check_try_count = 0;
		this.clear_check_time = 0;
		this.creation_id = null;
		this.upload_id = null;
		this.completion_flags = 0;
		this.game_style = 0;
		this.name = null;
		this.description = null;

		// Course data

		this.theme = 0;
		this.autoscroll_type = 0;
		this.screen_boundary_flags = 0;
		this.vertical = false;
		this.liquid_end_height = 0;
		this.liquid_mode = 0;
		this.liquid_speed = 0;
		this.liquid_start_height = 0;
		this.boundary_right = 0;
		this.boundary_top = 0;
		this.boundary_left = 0;
		this.boundary_bottom = 0;
		this.area_flags = 0;

		this.object_count = 0;
		this.sound_effect_count = 0;
		this.snake_block_count = 0;
		this.clear_pipe_count = 0;
		this.piranha_creepers_count = 0;
		this.expanding_block_count = 0;
		this.track_block_count = 0;
		this.tile_count = 0;
		this.track_count = 0;
		this.icicle_count = 0;

		this.objects = [];

		this.subworld = null; // Temp because I don't parse subworlds yet, store later for encoding

		// Auto-parse the data
		this.parse();
	}

	parse() {
		const stream = new StreamIn(this.data);

		// Parse header
		this.start_y = stream.readUInt8();
		this.goal_y = stream.readUInt8();
		this.goal_x = stream.readUInt16LE();
		this.time_limit = stream.readUInt16LE();
		this.clear_condition_count = stream.readUInt16LE();
		this.saved_year = stream.readUInt16LE();
		this.saved_month = stream.readUInt8();
		this.saved_day = stream.readUInt8();
		this.saved_hour = stream.readUInt8();
		this.saved_minute = stream.readUInt8();
		this.autoscroll_speed = stream.readUInt8();
		this.clear_condition_category = stream.readUInt8();
		this.clear_condition_crc = stream.readBytes(0x4);
		this.game_version = stream.readUInt32LE();
		//this.management_flags = stream.readUInt32LE(4);
		this.management_flags = stream.readUInt32LE();
		this.clear_check_try_count = stream.readUInt32LE();
		this.clear_check_time = stream.readUInt32LE();
		this.creation_id = stream.readBytes(0x4).toString('hex');
		this.upload_id = stream.readBytes(0x8).toString('hex');
		this.completion_flags = stream.readUInt32LE();
		stream.skip(0xBC); // Padding
		stream.skip(0x1); // Unknown
		this.game_style = stream.readBytes(0x2).toString();
		stream.skip(0x1); // Null termination for game style string
		this.name = stream.readBytes(0x42).toString('utf16le').split('\0').shift();
		this.description = stream.readBytes(0xCA).toString('utf16le').split('\0').shift();

		// Parse overworld data

		this.theme = stream.readUInt8();
		this.autoscroll_type = stream.readUInt8();
		this.screen_boundary_flags = stream.readUInt8();
		this.vertical = stream.readUInt8();
		this.liquid_end_height = stream.readUInt8();
		this.liquid_mode = stream.readUInt8();
		this.liquid_speed = stream.readUInt8();
		this.liquid_start_height = stream.readUInt8();
		this.boundary_right = stream.readUInt32LE();
		this.boundary_top = stream.readUInt32LE();
		this.boundary_left = stream.readUInt32LE();
		this.boundary_bottom = stream.readUInt32LE();
		this.area_flags = stream.readUInt32LE();

		this.object_count = stream.readUInt32LE();
		this.sound_effect_count = stream.readUInt32LE();
		this.snake_block_count = stream.readUInt32LE();
		this.clear_pipe_count = stream.readUInt32LE();
		this.piranha_creepers_count = stream.readUInt32LE();
		this.expanding_block_count = stream.readUInt32LE();
		this.track_block_count = stream.readUInt32LE();
		stream.skip(0x4); // Padding
		this.tile_count = stream.readUInt32LE();
		this.track_count = stream.readUInt32LE();
		this.icicle_count = stream.readUInt32LE();

		// Skipping 3DW data for now since it's a pain in the ass to render 3DW models compared to 2D sprites
		// Each section has a reserved length, so we have to seek to start of each section
		stream.seek(0x248);
		const objects = stream.substream(0x20 * this.object_count);

		stream.seek(0x14548);
		const soundEffects = stream.substream(0x4 * this.sound_effect_count);

		stream.seek(0x14BF8);
		const snakeBlocks = stream.substream(0x3C4 * this.snake_block_count);

		stream.seek(0x247A4);
		const tiles = stream.substream(0x4 * this.tile_count);

		stream.seek(0x28824);
		const rails = stream.substream(0xC * this.track_count);

		stream.seek(0x2CC74);
		const icicles = stream.substream(0x4 * this.icicle_count);

		for (let i = 0; i < this.object_count; i++) {
			const objectData = objects.substream(0x20);
			objectData.seek(0x18);

			const type = objectData.readUInt16LE();

			objectData.seek(0);

			const CourseObject = objectClassList[type];

			if (!CourseObject) {
				console.log('Unknown object ID:', `0x${type.toString(16)}`);
				this.objects.push(new GenericObject(objectData));
				continue;
			}

			this.objects.push(new CourseObject(objectData));
		}

		stream.seek(0x2E0E0); // subworld offset

		this.subworld = stream.readBytes(stream.data().length - stream.position); // read the rest of the stream

		// TODO: sub world
	}

	encode() {
		const stream = new StreamOut();

		// Write header

		stream.writeUInt8(this.start_y);
		stream.writeUInt8(this.goal_y);
		stream.writeUInt16LE(this.goal_x);
		stream.writeUInt16LE(this.time_limit);
		stream.writeUInt16LE(this.clear_condition_count);
		stream.writeUInt16LE(this.saved_year);
		stream.writeUInt8(this.saved_month);
		stream.writeUInt8(this.saved_day);
		stream.writeUInt8(this.saved_hour);
		stream.writeUInt8(this.saved_minute);
		stream.writeUInt8(this.autoscroll_speed);
		stream.writeUInt8(this.clear_condition_category);
		stream.write(this.clear_condition_crc);
		stream.writeUInt32LE(this.game_version);
		stream.writeUInt32LE(this.management_flags);
		stream.writeUInt32LE(this.clear_check_try_count);
		stream.writeUInt32LE(this.clear_check_time);
		stream.write(Buffer.from(this.creation_id, 'hex'));
		stream.write(Buffer.from(this.upload_id, 'hex'));
		stream.writeUInt32LE(this.completion_flags);
		stream.write(Buffer.alloc(0xBC));
		stream.writeUInt8(0xFF);

		const gameStyle = Buffer.alloc(0x3, '\0');
		const name = Buffer.alloc(0x42, '\0');
		const description = Buffer.alloc(0xCA, '\0');

		gameStyle.write(this.game_style);
		name.write(Buffer.from(this.name, 'ucs2').toString());
		description.write(Buffer.from(this.description, 'ucs2').toString());

		stream.write(gameStyle);
		stream.write(name);
		stream.write(description);

		// Write overworld data

		stream.writeUInt8(this.theme);
		stream.writeUInt8(this.autoscroll_type);
		stream.writeUInt8(this.screen_boundary_flags);
		stream.writeUInt8(this.vertical);
		stream.writeUInt8(this.liquid_end_height);
		stream.writeUInt8(this.liquid_mode);
		stream.writeUInt8(this.liquid_speed);
		stream.writeUInt8(this.liquid_start_height);
		stream.writeUInt32LE(this.boundary_right);
		stream.writeUInt32LE(this.boundary_top);
		stream.writeUInt32LE(this.boundary_left);
		stream.writeUInt32LE(this.boundary_bottom);
		stream.writeUInt32LE(this.area_flags);
		stream.writeUInt32LE(this.object_count);
		stream.writeUInt32LE(this.sound_effect_count);
		stream.writeUInt32LE(this.snake_block_count);
		stream.writeUInt32LE(this.clear_pipe_count);
		stream.writeUInt32LE(this.piranha_creepers_count);
		stream.writeUInt32LE(this.expanding_block_count);
		stream.writeUInt32LE(this.track_block_count);
		stream.write(Buffer.alloc(0x4)); // Padding
		stream.writeUInt32LE(this.tile_count);
		stream.writeUInt32LE(this.track_count);
		stream.writeUInt32LE(this.icicle_count);

		const maxObjectSectionLength = 2600 * 0x20;
		const maxSoundEffectSectionLength = 300 * 0x4;
		const maxSnakeBlockSectionLength = 5 * 0x3C4;
		const maxClearPipeSectionLength = 200 * 0x124;
		const maxPiranhaCreeperSectionLength = 10 * 0x54;
		const maxExpandingBlockSectionLength = 10 * 0x2C;
		const maxTrackBlockSectionLength = 10 * 0x2C;
		const maxTileSectionLength = 4000 * 0x4;
		const maxRailSectionLength = 1500 * 0xC;
		const maxIcicleSectionLength = 300 * 0x4;

		const objectSection = new StreamOut();
		/*
		// Currently unused
		const soundEffectSection = new StreamOut();
		const snakeBlockSection = new StreamOut();
		const clearPipeSection = new StreamOut();
		const piranhaCreeperSection = new StreamOut();
		const expandingBlockSection = new StreamOut();
		const trackBlockSection = new StreamOut();
		const tileSection = new StreamOut();
		const railSection = new StreamOut();
		const icicleSection = new StreamOut();
		*/

		for (const object of this.objects) {
			objectSection.write(object.encode());
		}

		const objectSectionPadding = Buffer.alloc(maxObjectSectionLength - objectSection.data().length);

		stream.write(objectSection.data());
		stream.write(objectSectionPadding); // Any leftover space gets filled

		// Currently not supporting these, so just fill with blank

		stream.write(Buffer.alloc(maxSoundEffectSectionLength));
		stream.write(Buffer.alloc(maxSnakeBlockSectionLength));
		stream.write(Buffer.alloc(maxClearPipeSectionLength));
		stream.write(Buffer.alloc(maxPiranhaCreeperSectionLength));
		stream.write(Buffer.alloc(maxExpandingBlockSectionLength));
		stream.write(Buffer.alloc(maxTrackBlockSectionLength));
		stream.write(Buffer.alloc(maxTileSectionLength));
		stream.write(Buffer.alloc(maxRailSectionLength));
		stream.write(Buffer.alloc(maxIcicleSectionLength));

		// Unmapped bytes

		stream.write(Buffer.alloc(0xDBC));

		// Write subworld data

		stream.write(this.subworld); // Just slap the whole thing back in cuz why not

		return stream.data();
	}


}

module.exports = Course;