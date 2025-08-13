import {useEffect, useState} from "react";
import type {SimpleService} from "../../service/SimpleService.ts";
import {useGroupStore} from "../../store/groupStore.ts";

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    currentSeq?: number,
    currentName?: string,
    currentDescription?: string,
    boardName: string;
    service: SimpleService;
    // children: React.ReactNode,
};

const SimpleInsertModal = ({isOpen, onClose, currentSeq, currentName,
                               currentDescription, boardName, service}: ModalProps) => {
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    const [seq, setSeq] = useState<number>()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const modalType = () => {
        if (!currentSeq) {
            return "추가"
        }
        return "수정"
    }

    const handleSubmit = async () => {
        if (seq == null || currentSeq == null) {
            await postItem();
        } else {
            await patchItem();
        }
        onClose()
        window.location.reload();
    };

    const postItem = async () => {
        try {
            const response = await service.post(name, description, selectedGroup); // ✅ await 추가
            console.log("저장 완료:", response);
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
            const response = service.patch(seq, name, description);
            console.log("저장 완료:", response);
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
                <h2 className="text-xl font-semibold mb-4">{boardName} {modalType()}</h2>

                <input
                    type="text"
                    placeholder={`${boardName} 이름`}
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

export default SimpleInsertModal;