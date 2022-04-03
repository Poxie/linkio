import React, { useRef } from 'react';
import { useModal } from '../../../contexts/ModalProvider';
import { FileModal } from '../../../modals/file-modal/FileModal';
import styles from '../../../styles/Admin.module.scss';

export const CustomizeFileInput: React.FC<{
    header: string;
    onSubmit: (file: File) => void;
    image?: string;
    aspectRatio?: number;
    placeholder?: string;
}> = ({ header, onSubmit, image, placeholder, aspectRatio=1 }) => {
    const { setModal, closeModals } = useModal();
    const input = useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const file = e.target.files[0];
        if(!file) return;

        setModal(
            <FileModal 
                file={file}
                aspectRatio={aspectRatio}
                onDone={file => {
                    closeModals();
                    onSubmit(file);
                }}
                onCancel={() => {
                    if(!input.current) return;
                    input.current.value = '';
                    closeModals();
                }}
            />
        )
    }

    const previewStyles = [
        styles['image-preview'],
        !image && styles['no-image']
    ].join(' ');
    return(
        <div>
            <div className={styles['input-header']}>
                {header}
            </div>

            <div 
                className={previewStyles} 
                onClick={() => input.current?.click()}
                style={{ aspectRatio: `${aspectRatio}` }}
                data-image-placeholder={placeholder}
            >
                <img src={image} alt="" />
            </div>

            <input type="file" onChange={onChange} style={{ display: 'none' }} ref={input} />
        </div>
    )
}