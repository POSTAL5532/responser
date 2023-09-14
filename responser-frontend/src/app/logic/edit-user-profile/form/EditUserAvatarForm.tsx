import React, {useState} from "react";
import AvatarEditor from "react-avatar-editor";
import {observer} from "mobx-react";
import Compressor from 'compressorjs';
import {Button, ButtonSize, ButtonType} from "../../../components/button/Button";

type EditUserAvatarProps = {
    imageSrc: File;
    onSave?: (dataUrl: string, blob: Blob) => void;
    onCancel?: () => void;
}

const EditUserAvatar: React.FC<EditUserAvatarProps> = (props: EditUserAvatarProps) => {
    const {imageSrc, onSave, onCancel} = props;
    const editorRef = React.useRef<AvatarEditor>();
    const [zoom, setZoom] = useState<number>(1)

    console.log("PROPS " + imageSrc.type + " FILE SIZE:", imageSrc.size / 1024)

    const compressImageAndSave = (dataUrl: string, file: Blob) => {
        if (!onSave) return;
        console.log("RAW " + file.type + " FILE SIZE:", file.size / 1024)

        new Compressor(file, {
            quality: 0.8,
            height: 300,
            success: result => {
                console.log("RESULT " + result.type + " FILE SIZE:", result.size / 1024)
                onSave(dataUrl, result);
            }
        })
    }

    // TODO: Check the quality parameter in toBlob and toDataUrl
    const onSaveButtonClick = () => {
        const dataUrl = editorRef.current.getImage().toDataURL();
        editorRef.current.getImage().toBlob(blob => compressImageAndSave(dataUrl, blob), "image/jpeg", 0.8);
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
