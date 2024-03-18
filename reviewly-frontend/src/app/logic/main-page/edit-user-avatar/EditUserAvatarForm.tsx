import React, {useState} from "react";
import AvatarEditor from "react-avatar-editor";
import Compressor from 'compressorjs';
import {Button, ButtonSize, ButtonType} from "../../../components/button/Button";
import {Logger, useLogger} from "../../../utils/Logger";
import {bytesToKilobytes, FILE_TYPE} from "../../../utils/FileUtils";
import Nouislider from "nouislider-react";
import {Icon, IconType} from "../../../components/icon/Icon";
import classNames from "classnames";
import "./EditUserAvatarForm.less";

type EditUserAvatarFormProps = {
    imageSrc: File;
    onSave?: (dataUrl: string, blob: Blob) => void;
    compressQuality?: number;
    resultImageHeight?: number;
    loading?: boolean;
}

export const EditUserAvatarForm: React.FC<EditUserAvatarFormProps> = (props: EditUserAvatarFormProps) => {
    const {imageSrc, compressQuality = 0.8, resultImageHeight = 300, onSave, loading = false} = props;
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

    const onZoomChange = (value: number[]) => {
        setZoom(value[0]);
    }

    const resultClassName = classNames("avatar-editor", {"loading": loading});

    return (
        <div className={resultClassName}>
            <div className="avatar-editor-canvas-container">
                <AvatarEditor
                    ref={editorRef}
                    width={280}
                    height={280}
                    image={imageSrc}
                    border={0}
                    borderRadius={137}
                    color={[0, 0, 0, 0.5]} // RGBA
                    scale={1 + zoom / 100}
                    rotate={0}/>
            </div>

            <div className="controls">
                <Nouislider
                    disabled={loading}
                    range={{min: 1, max: 100}}
                    start={1}
                    step={1}
                    connect={[true, false]}
                    onSlide={onZoomChange}/>

                <Button onClick={onSaveButtonClick} styleType={ButtonType.PRIMARY} size={ButtonSize.SMALL} loading={loading} disabled={loading}>
                    <Icon type={IconType.CHECK}/>Save
                </Button>
            </div>
        </div>
    )
}
