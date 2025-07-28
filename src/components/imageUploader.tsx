import React, { useRef, useState } from "react";

interface Props {
    onFileChange: (file: File) => void;
}

const ImageUploader: React.FC<Props> = ({ onFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);

            // 미리보기 URL 생성
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    return (
        <div className="space-y-2">
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="선택한 이미지"
                    className="w-40 h-40 object-cover rounded border"
                />
            ) : (
                <img
                    src="/vite.svg"
                    alt="기본 이미지"
                    className="w-40 h-40 object-cover rounded border opacity-50"
                />
            )}

            <button
                type="button"
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                사진 선택
            </button>

            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleChange}
            />

        </div>
    );
};

export default ImageUploader;
