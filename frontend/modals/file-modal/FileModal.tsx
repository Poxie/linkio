import React, { useEffect, useRef, useState } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from './FileModal.module.scss';
import { ModalHeader } from '../ModalHeader';
import { Button } from '../../components/Button';

export const FileModal: React.FC<{
    file: File;
    onCancel?: () => void;
    onDone?: (file: File) => void;
    aspectRatio?: number;
}> = ({ file, onCancel, onDone, aspectRatio=3/1 }) => {
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [cropper, setCropper] = useState<any>();

    const done = () => {
        if(!onDone) return;

        cropper.getCroppedCanvas().toBlob((blob: Blob) => {
            const file = new File([blob], 'file', { type: 'image/png' });
            onDone(file);
        })
    }

    useEffect(() => {
        const blob = URL.createObjectURL(file);
        setTempImage(blob);
    }, [file]);

    return(
        <div className={styles.container} style={{ position: 'relative' }}>
            <ModalHeader>
                Crop Image
            </ModalHeader>
            {tempImage && (
                <Cropper
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    aspectRatio={aspectRatio}
                    preview=".img-preview"
                    src={tempImage}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                    guides={true}
                />
            )}
            <div className={styles.footer}>
                <Button className={styles.button} type={'secondary'} onClick={onCancel}>
                    Cancel
                </Button>
                <Button className={styles.button} onClick={done}>
                    I'm done
                </Button>
            </div>
        </div>
    )
}