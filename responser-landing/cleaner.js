const fileSystem = require("fs");
const path = require("path");

console.log("Remove build directory.");
fileSystem.rmSync(path.resolve(__dirname, "build"), {recursive: true, force: true});
