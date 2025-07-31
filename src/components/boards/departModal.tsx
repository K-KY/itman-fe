import {useEffect, useState} from "react";
import "../../axios/depart.ts"
import {postDepart, patchDepart} from "../../axios/depart.ts";

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    currentSeq?: number,
    currentName?: string,
    currentDescription?: string,
    // children: React.ReactNode,
};

const DepartInsertModal = ({isOpen, onClose, currentSeq, currentName, currentDescription}: ModalProps) => {
    const [seq, setSeq] = useState<number>()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (seq == null || currentSeq == null) {
            postItem()
            return;
        }
        patchItem()
    };

    const postItem = () => {
        try {
            const response = postDepart(name, description);
            console.log("저장 완료:", response);
            onClose(); // 저장 후 모달 닫기
            window.location.reload();
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장에 실패했습니다.");
        }
    }

    const patchItem = () => {
        if (!seq) {
            postItem()
            return;
        }
        try {
            const response = patchDepart(seq, name, description);
            console.log("저장 완료:", response);
            onClose(); // 저장 후 모달 닫기
            window.location.reload();
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장에 실패했습니다.");
        }
    }

    useEffect(() => {
        if (currentSeq != null) {
            setSeq(currentSeq);
            setName(currentName ?? "");
            setDescription(currentDescription ?? "")
        }
        const preventScroll = (e: Event) => {
            e.preventDefault();
        };

        const preventKeyScroll = (e: KeyboardEvent) => {
            const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
            if (keys.includes(e.key)) e.preventDefault();
        };

        if (isOpen) {
            window.addEventListener("wheel", preventScroll, {passive: false});
            window.addEventListener("touchmove", preventScroll, {passive: false});
            window.addEventListener("keydown", preventKeyScroll, {passive: false});
        }

        // ✅ cleanup 함수 추가
        return () => {
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("keydown", preventKeyScroll);
        };
    }, [isOpen]);


    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;


    return (
        <div
            className="fixed inset-0 bg-black/30 flex justify-center items-center z-[999] p-8"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">부서 추가</h2>

                <input
                    type="text"
                    placeholder="부서 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        닫기
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>

    )
}

export default DepartInsertModal;