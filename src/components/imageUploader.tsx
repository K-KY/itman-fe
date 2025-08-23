import React, {useRef, useState} from "react";
import {getImages, uploadImage} from "../axios/image.ts";

interface Props {
    onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<Props> = ({onImageUpload}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const uploadedData = await uploadImage(file);// 랜덤 생성된 이미지 아이디

        if (file) {
            onImageUpload(uploadedData);

            // 미리보기 URL 생성
            const images = await getImages(uploadedData);
            setPreviewUrl(`data:${images.contentType};base64,${images.image}`);//base64 문자열을 URL로 해석해서 요청을 보내버림
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
                style={{display: "none"}}
                ref={fileInputRef}
                onChange={handleChange}
            />

        </div>
    );
};

export default ImageUploader;
