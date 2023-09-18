import React, {ChangeEvent, DragEvent, SyntheticEvent, useState} from "react";
import classNames from "classnames";
import "./DragAndDrop.less";

type DragAndDropProps = {
    onChange?: (data: File) => void;
    maxFileSize?: number; // KB
    acceptedFileTypes?: string[]
}

export const DragAndDrop: React.FC<DragAndDropProps> = (props: DragAndDropProps) => {
    const {onChange, maxFileSize = 1024, acceptedFileTypes = []} = props;
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
        prevent(event);
        setWrongFileSize(false);

        setActive(true);
        const file: DataTransferItem = event.dataTransfer.items?.[0];

        if (!!file && !acceptedFileTypes.includes(file.type)) {
            setWrongFileType(true);
        }
    }

    const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
        prevent(event);
        setActive(false);
        setWrongFileType(false);
        setWrongFileTypeMessage(false);
        setWrongFileSize(false);
    }

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        prevent(event);
    }

    const onFileClick = () => {
        fileInputRef.current.click();
    }

    const checkFile = (file: Blob | File): boolean => {
        if (!file) {
            return false;
        }

        if (!acceptedFileTypes.includes(file.type)) {
            setWrongFileTypeMessage(true);
            return false;
        }

        if (file.size > (maxFileSize * 1024)) {
            setWrongFileSize(true);
            return false;
        }

        return true;
    }

    const handleFileChanging = (event: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>, file: File) => {
        prevent(event);
        setActive(false);
        setWrongFileType(false);
        setWrongFileTypeMessage(false);
        setWrongFileSize(false);

        if (!file) {
            return;
        }

        if (!checkFile(file)) {
            return;
        }

        onChange?.(file);
    }

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        handleFileChanging(event, event.dataTransfer.files?.[0]);
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleFileChanging(event, event.currentTarget.files?.[0]);
    }

    const resultClassName = classNames("drag-n-drop", {"active": active, "wrong-file-type": wrongFileType})

    return (
        <div>
            <div onClick={onFileClick} className={resultClassName} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}>

                <input ref={fileInputRef}
                       className="file-input"
                       type="file"
                       onChange={onFileChange}
                       accept={acceptedFileTypes.length > 0 ? acceptedFileTypes.join(", ") : undefined}/>

                <p className="label">{
                    active ? (wrongFileType ? "Bad file type" : "Drop file here") : "Click or Drag and Drop file here"}
                </p>
            </div>

            {wrongFileTypeMessage && <span style={{color: "red"}}>Wrong file type</span>}
            {wrongFileSize && <span style={{color: "red"}}>Wrong file size</span>}
        </div>
    );
}