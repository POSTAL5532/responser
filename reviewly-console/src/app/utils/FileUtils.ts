export const FILE_TYPE = {
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    png: "image/png",
    bmp: "image/bmp"
}

export const bytesToKilobytes = (bytes: number) => {
    if (!bytes) return 0;
    return bytes / 1024;
}
