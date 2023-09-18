import React, {useState} from "react";
import AvatarEditor from "react-avatar-editor";
import {observer} from "mobx-react";
import Compressor from 'compressorjs';
import {Button, ButtonSize, ButtonType} from "../../../components/button/Button";
import {Logger, useLogger} from "../../../utils/Logger";
import {bytesToKilobytes, FILE_TYPE} from "../../../utils/FileUtils";

type EditUserAvatarProps = {
    imageSrc: File;
    onSave?: (dataUrl: string, blob: Blob) => void;
    onCancel?: () => void;
    compressQuality?: number;
    resultImageHeight?: number;
}

const EditUserAvatar: React.FC<EditUserAvatarProps> = (props: EditUserAvatarProps) => {
    const {imageSrc, compressQuality = 0.8, resultImageHeight = 300, onSave, onCancel} = props;
    const editorRef = React.useRef<AvatarEditor>();
    const [zoom, setZoom] = useState<number>(1);
    const logger: Logger = useLogger("EditUserAvatar");

    logger.debug("Initial " + imageSrc.type + " file size: " + bytesToKilobytes(imageSrc.size));

    const compressImageAndSave = (dataUrl: string, file: Blob) => {
        if (!onSave) return;
        logger.debug("Compression: raw " + file.type + " file size:" + bytesToKilobytes(imageSrc.size));

        new Compressor(file, {
            quality: compressQuality,
            height: resultImageHeight,
            success: result => {
                logger.debug("Compression: result " + result.type + " file size:" + bytesToKilobytes(imageSrc.size));
                onSave(dataUrl, result);
            }
        })
    }

    const onSaveButtonClick = () => {
        const dataUrl = editorRef.current.getImage().toDataURL();
        editorRef.current.getImage().toBlob(blob => compressImageAndSave(dataUrl, blob), FILE_TYPE.jpeg, compressQuality);
    }

    const onZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.currentTarget.value);
        setZoom(value)
    }

    return (
        <div className="avatar-editor">
            <AvatarEditor
                ref={editorRef}
                width={500}
                height={500}
                image={imageSrc}
                border={20}
                borderRadius={1510}
                color={[0, 0, 0, 0.5]} // RGBA
                scale={1 + zoom / 100}
                rotate={0}/>

            <input className="slider" type="range" min="1" max="100" value={zoom} onChange={onZoomChange}/>

            <Button onClick={onSaveButtonClick} size={ButtonSize.SMALL}>Save</Button>
            <Button onClick={onCancel} size={ButtonSize.SMALL} styleType={ButtonType.SECONDARY}>Cancel</Button>
        </div>
    )
}

export default observer(EditUserAvatar);
