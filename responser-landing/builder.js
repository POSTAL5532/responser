const fileSystem = require("fs");
const path = require("path");
const {exec} = require("child_process");

const BUILD_DIR = "build";

const CSS_DIR = "css";
const JS_DIR = "js";
const IMG_DIR = "img";
const FONTS_DIR = "fonts";

const BUILD_CSS_DIR = path.resolve(BUILD_DIR, CSS_DIR);
const BUILD_JS_DIR = path.resolve(BUILD_DIR, JS_DIR);
const BUILD_IMG_DIR = path.resolve(BUILD_DIR, IMG_DIR);
const BUILD_FONTS_DIR = path.resolve(BUILD_DIR, FONTS_DIR);

const resolvePath = (...paths) => {
    return path.resolve(__dirname, ...paths);
}

const copyFileToDirectory = (filePath, dirPath) => {
    const fileNameParts = filePath.split(path.sep);
    const fileName = fileNameParts[fileNameParts.length - 1];
    console.info("Copy file\nfrom:", filePath, "\nto:", resolvePath(dirPath, fileName), "\n");
    fileSystem.copyFileSync(filePath, resolvePath(dirPath, fileName));
}

const readFilesInDirectoryAndProcess = (directory, processor) => {
    fileSystem.readdirSync(directory).forEach(file => {
        processor(resolvePath(directory, file), file);
    });
}

const copyFilesFromDirectoryToDirectory = (directory, targetDirectory) => {
    readFilesInDirectoryAndProcess(directory, file => copyFileToDirectory(file, targetDirectory));
}

const prepareBuildDir = () => {
    if (fileSystem.existsSync(resolvePath(BUILD_DIR))) {
        console.info("Remove existing build directory.");
        fileSystem.rmSync(resolvePath(BUILD_DIR), {recursive: true, force: true});
    }

    console.info("Create project directories.");

    fileSystem.mkdirSync(resolvePath(BUILD_DIR));
    fileSystem.mkdirSync(resolvePath(BUILD_CSS_DIR));
    fileSystem.mkdirSync(resolvePath(BUILD_JS_DIR));
    fileSystem.mkdirSync(resolvePath(BUILD_IMG_DIR));
    fileSystem.mkdirSync(resolvePath(BUILD_FONTS_DIR));
}

const htmlProcessor = () => {
    fileSystem.copyFileSync(
        resolvePath("index.html"),
        resolvePath(BUILD_DIR, "index.html")
    );
}

const styleProcessor = async () => {
    const {stdout, stderr} = await exec(
        `lessc ${resolvePath(CSS_DIR, "styles.less")} ${resolvePath(BUILD_CSS_DIR, "styles.css")}`
    );
}

const fontsProcessor = () => {
    copyFilesFromDirectoryToDirectory(
        resolvePath(FONTS_DIR),
        resolvePath(BUILD_FONTS_DIR)
    );
}

const imgProcessor = () => {
    copyFilesFromDirectoryToDirectory(
        resolvePath(IMG_DIR),
        resolvePath(BUILD_IMG_DIR)
    );
}

const jsProcessor = () => {
    copyFilesFromDirectoryToDirectory(resolvePath(JS_DIR), resolvePath(BUILD_JS_DIR));
}

const build = () => {
    console.info("\n=========== Prepare build directory ===========");
    prepareBuildDir();
    console.info("\n=========== Process index.html file ===========");
    htmlProcessor();
    console.info("\n=========== Process css files ===========");
    styleProcessor();
    console.info("\n=========== Process fonts files ===========");
    fontsProcessor();
    console.info("\n=========== Process img files ===========");
    imgProcessor();
    console.info("\n=========== Process js files ===========");
    jsProcessor();
}

build();
