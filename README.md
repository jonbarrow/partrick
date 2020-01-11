# Partrick

## Overview

Partrick is a NodeJS module capable of decrypting, parsing, editing, and encrypting Super Mario Maker 2 courses. These courses can then be injected back into the users save and uploaded publically

It was designed for a course editor I am making and have not yet released called Mario Remaker

## Example: Edit impossible course to bypass clear check

```javascript
// Import tools for course editing
const { encryption, Course } = require('partrick');
const fs = require('fs');

const data = fs.readFileSync('./unbeatable_course.bcd');

// Decrypt the course data
const decrypted = encryption.decryptCourse(data);

// Use decrypted data to create a new Course
const course = new Course(decrypted);

// Trick the game into thinking the course has passed clear check, when in fact it has not
course.management_flags |= 3; // Can be uploaded

// All metadata can be changed
course.name = 'impossible';
course.description = 'I have not cleared this course, yet it uploads. It cannot be beaten';

// Encode and encrypt the edited course
const encrypted = encryption.encryptCourse(course.encode()); // Encode and encrypt the course again

// Save the new course to disk
fs.writeFileSync('impossible_course.bcd', encrypted);

// This course can now be injected back into the users save and uploaded, bypassing clear check
```

## Notes

1. 3DW support is limited at the moment, due to this being designed for a GUI course editor. Since 3DW uses 3D models and not 2D sprites, it is harder to easily get ahold of and implement these models into this editor, and thus 3DW support is not a priority (though it can be added)
2. This is still highly unfinished. While it does work, it has some clear limitations
3. 99% of the object classes are bare-bones and have no API for editing properties
4. Object-specific blocks of course data are not handled at all, only the generic Objects block is parsed (meaning data like snakeblock nodes is lost at the moment)
5. The subworld is not implemented at all, instead it is just stitched back to the end of the course data and re-used