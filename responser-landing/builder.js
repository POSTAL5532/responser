const fileSystem = require("fs");
const path = require("path");
const {initializeVariables} = require("./env.js");
const {exec} = require("child_process");

// TODO: refactor this bullshit

initializeVariables();

const BUILD_DIR = "build";

const CSS_DIR = "css";
const JS_DIR = "js";
const IMG_DIR = "img";
const FONTS_DIR = "fonts";

const BUILD_CSS_DIR = path.resolve(BUILD_DIR, CSS_DIR);
const BUILD_JS_DIR = path.resolve(BUILD_DIR, JS_DIR);
const BUILD_IMG_DIR = path.resolve(BUILD_DIR, IMG_DIR);
const BUILD_FONTS_DIR = path.resolve(BUILD_DIR, FONTS_DIR);

const resolveLocalModulePath = (...paths) => {
    return path.resolve(__dirname, ...paths);
}

/**
 * Populate the env properties in input.
 *
 * @param input input content {@link Buffer} (required)
 * @param absoluteFilename absolute filename (optional)
 * @returns {string} transformed content string
 */
const populateEnvProperties = (input, absoluteFilename = null) => {
    let fileContent = input.toString();
    const set = new Set([...fileContent.matchAll(/(?<={{)[A-Z\d_]+(?=}})/g)]);

    for (const property of set.keys()) {
        fileContent = fileContent.replaceAll(`{{${property}}}`, process.env[property]);
    }

    return fileContent;
}

// Filetype format is 'type', without dot.
const copyFileToDirectory = (filePath, dirPath, fileType) => {
    const fileNameParts = filePath.split(path.sep);
    const fileName = fileNameParts[fileNameParts.length - 1];

    if (!!fileType && !fileName.endsWith(`.${fileType}`)) {
        console.info(`Skip file ${fileName} - filetype is not matching with '${fileType}'.`);
        return;
    }

    console.info("Copy file\nfrom:", filePath, "\nto:", resolveLocalModulePath(dirPath, fileName), "\n");
    fileSystem.copyFileSync(filePath, resolveLocalModulePath(dirPath, fileName));
}

const readFilesInDirectoryAndProcess = (directory, processor) => {
    fileSystem.readdirSync(directory).forEach(file => {
        processor(resolveLocalModulePath(directory, file), file);
    });
}

const copyFilesFromDirectoryToDirectory = (directory, targetDirectory, fileType) => {
    readFilesInDirectoryAndProcess(directory, file => copyFileToDirectory(file, targetDirectory, fileType));
}

const prepareBuildDir = () => {
    if (fileSystem.existsSync(resolveLocalModulePath(BUILD_DIR))) {
        console.info("Remove existing build directory.");
        fileSystem.rmSync(resolveLocalModulePath(BUILD_DIR), {recursive: true, force: true});
    }

    console.info("Create project directories.");

    fileSystem.mkdirSync(resolveLocalModulePath(BUILD_DIR));
    fileSystem.mkdirSync(resolveLocalModulePath(BUILD_CSS_DIR));
    fileSystem.mkdirSync(resolveLocalModulePath(BUILD_JS_DIR));
    fileSystem.mkdirSync(resolveLocalModulePath(BUILD_IMG_DIR));
    fileSystem.mkdirSync(resolveLocalModulePath(BUILD_FONTS_DIR));
}

const htmlProcessor = () => {
    const processor = (file) => {
        let result;

        try {
            const data = fileSystem.readFileSync(resolveLocalModulePath("index.html"), "utf8");
            result = populateEnvProperties(data);
            console.log(file, data);
        } catch (err) {
            console.error("ERROR", err);
        }

        try {
            fileSystem.writeFileSync(resolveLocalModulePath(BUILD_DIR, "index.html"), result);
        } catch (err) {
            console.error(err);
        }
    }

    readFilesInDirectoryAndProcess("./", processor);

    /*fileSystem.copyFileSync(
        resolvePath("index.html"),
        resolvePath(BUILD_DIR, "index.html")
    );*/
}

const lessProcessor = async () => {
    await exec(`lessc ${resolveLocalModulePath(CSS_DIR, "styles.less")} ${resolveLocalModulePath(BUILD_CSS_DIR, "styles.css")}`);
}

const fontsProcessor = () => {
    copyFilesFromDirectoryToDirectory(
        resolveLocalModulePath(FONTS_DIR),
        resolveLocalModulePath(BUILD_FONTS_DIR)
    );
}

const imgProcessor = () => {
    copyFilesFromDirectoryToDirectory(
        resolveLocalModulePath(IMG_DIR),
        resolveLocalModulePath(BUILD_IMG_DIR)
    );
}

const jsProcessor = () => {
    copyFilesFromDirectoryToDirectory(resolveLocalModulePath(JS_DIR), resolveLocalModulePath(BUILD_JS_DIR));
}

const cssProcessor = () => {
    copyFilesFromDirectoryToDirectory(resolveLocalModulePath(CSS_DIR), resolveLocalModulePath(BUILD_CSS_DIR), "css");
}

const build = () => {
    console.info("\n=========== Prepare build directory ===========");
    prepareBuildDir();
    console.info("\n=========== Process index.html file ===========");
    htmlProcessor();
    console.info("\n=========== Process css files ===========");
    lessProcessor();
    console.info("\n=========== Process fonts files ===========");
    fontsProcessor();
    console.info("\n=========== Process img files ===========");
    imgProcessor();
    console.info("\n=========== Process js files ===========");
    jsProcessor();
    console.info("\n=========== Process separated css files ===========");
    cssProcessor();
}

build();

console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", process.env.QWERTY);
