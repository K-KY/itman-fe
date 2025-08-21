import {useState} from "react";
import SimpleInsertModal from "./simpleModal.tsx";
import type {SimpleBoard} from "../../interfaces/SimpleBoard.ts";
import type {SimpleService} from "../../service/SimpleService.ts";
import {useGroupStore} from "../../store/groupStore.ts";

interface ItemProps {
    item: SimpleBoard;
    boardName: string;
    service: SimpleService
    onChange: () => void;
    subtitle: string;
}

const SimpleBoardItem = ({item, boardName, service, onChange, subtitle}: ItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enabled, setEnabled] = useState(item.enabled)
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    return (
        <li
            key={item.seq}
            className="relative group flex justify-between hover:bg-gray-50 border-b overflow-hidden"
        >
            <div className="p-4 flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{boardName} 번호: {item.seq}</p>
                <p className="text-sm text-gray-500">{subtitle}: {item.description}</p>
                <p className="text-sm text-gray-400">
                    생성일: {new Date(item.createdDate).toLocaleDateString()} / 수정일:{" "}
                    {new Date(item.updatedDate).toLocaleDateString()}
                </p>


                <div className="mt-2" onClick={() => {
                    setEnabled(enabled => !enabled);
                    service.patchEnable(item.seq, selectedGroup, enabled, false).then(() => {
                        onChange();
                    })
                }}>
                    <a className={"cursor-pointer"}>
                        {!enabled ? (
                            <span className="inline-block px-2 py-1 text-sm font-medium
                        text-red-600 bg-red-100 rounded-md">
                        비활성
                        </span>
                        ) : (
                            <span
                                className="inline-block px-2 py-1 text-sm font-medium
                            text-green-600 bg-green-100 rounded-md">
                            활성
                        </span>
                        )}
                    </a>
                </div>
            </div>
            <div
                className="absolute top-1/2 -translate-y-1/2 right-0 flex gap-1 transform translate-x-full
                group-hover:translate-x-0 transition-transform duration-300 h-full flex-col"
            >
                <div className="flex h-full">
                    <button onClick={() => {setIsModalOpen(true)}}
                            className="px-4 py-2  text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
                        수정
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600">
                        삭제
                    </button>
                </div>
            </div>
            <SimpleInsertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                               currentSeq={item.seq} currentName={item.name} boardName={boardName}
                               currentDescription={item.description} service={service}/>

        </li>
    );
};

export default SimpleBoardItem;
