import React, {ChangeEvent, DragEvent, SyntheticEvent, useState} from "react";
import classNames from "classnames";
import "./DrugAndDrop.less";

const ACCEPTED_FILE_TYPES: string[] = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];
const MAX_FILE_SIZE: number = 2048;

type DrugAndDropProps = {
    onChange?: (data: File) => void;
}

export const DrugAndDrop: React.FC<DrugAndDropProps> = (props: DrugAndDropProps) => {
    const {onChange} = props;
    const [active, setActive] = useState<boolean>(false);
    const [wrongFileType, setWrongFileType] = useState<boolean>(false);
    const [wrongFileTypeMessage, setWrongFileTypeMessage] = useState<boolean>(false);
    const [wrongFileSize, setWrongFileSize] = useState<boolean>(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const prevent = (event: SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
        console.log("onDragEnter")
        prevent(event);
        setWrongFileSize(false);

        setActive(true);
        const file: DataTransferItem = event.dataTransfer.items?.[0];

        if (!!file && !ACCEPTED_FILE_TYPES.includes(file.type)) {
            setWrongFileType(true);
        }
    }

    const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
        console.log("onDragLeave")
        prevent(event);
        setActive(false);
        setWrongFileType(false);
        setWrongFileTypeMessage(false);
        setWrongFileSize(false);
    }

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        console.log("onDragOver")
        prevent(event);
    }

    const onFileClick = () => {
        console.log("onFileClick")
        fileInputRef.current.click();
    }

    const checkFile = (file: Blob | File): boolean => {
        console.log("checkFile")
        if (!file) {
            console.log("empty file")
            return false;
        }

        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            console.log("setWrongFileTypeMessage")
            setWrongFileTypeMessage(true);
            return false;
        }

        if (file.size > (MAX_FILE_SIZE * 1024)) {
            console.log("setWrongFileSize")
            setWrongFileSize(true);
            return false;
        }

        return true;
    }

    const handleFileChanging = (event: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>, file: File) => {
        console.log("handleFileChanging")
        prevent(event);
        setActive(false);
        setWrongFileType(false);
        setWrongFileTypeMessage(false);
        setWrongFileSize(false);

        if (!file) {
            console.error("No file");
            return;
        }

        if (!checkFile(file)) {
            return;
        }

        onChange?.(file);
    }

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        console.log("onDrop")
        handleFileChanging(event, event.dataTransfer.files?.[0]);
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("onFileChange")
        handleFileChanging(event, event.currentTarget.files?.[0]);
    }

    const resultClassName = classNames("drug-n-drop", {"active": active, "wrong-file-type": wrongFileType})

    return (
        <div>
            <div onClick={onFileClick} className={resultClassName} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}>
                <input ref={fileInputRef} className="file-input" type="file" onChange={onFileChange} accept={ACCEPTED_FILE_TYPES.join(", ")}/>
                <p className="label">{active ? (wrongFileType ? "Bad file type" : "Drop file here") : "Click or Drug and Drop file here"}</p>
            </div>
            {wrongFileTypeMessage && <span style={{color: "red"}}>Wrong file type</span>}
            {wrongFileSize && <span style={{color: "red"}}>Wrong file size</span>}
        </div>
    );
}