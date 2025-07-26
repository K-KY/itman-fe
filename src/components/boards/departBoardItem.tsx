import type {DepartData} from "../axios/depart.ts";
import {useState} from "react";
import DepartInsertModal from "./departModal.tsx";

interface DepartItemProps {
    item: DepartData;
}

const DepartItem = ({item}: DepartItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <li
            key={item.departSeq}
            className="relative group flex justify-between hover:bg-gray-50 border-b overflow-hidden"
        >
            <div className="p-4 flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.departName}</p>
                <p className="text-sm text-gray-500">부서 번호: {item.departSeq}</p>
                <p className="text-sm text-gray-500">설명: {item.description}</p>
                <p className="text-sm text-gray-400">
                    생성일: {new Date(item.createdDate).toLocaleDateString()} / 수정일:{" "}
                    {new Date(item.updatedDate).toLocaleDateString()}
                </p>

                <div className="mt-2">
                    {item.del ? (
                        <span className="inline-block px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md">
                    삭제됨
                </span>
                    ) : (
                        <span
                            className="inline-block px-2 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-md">
                    활성
                </span>
                    )}
                </div>
            </div>
            <div
                className="absolute top-1/2 -translate-y-1/2 right-0 flex gap-1 transform translate-x-full
                group-hover:translate-x-0 transition-transform duration-300 h-full flex-col"
            >
                <div className="flex h-full">
                    <button onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2  text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
                        수정
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600">
                        삭제
                    </button>
                </div>
            </div>
            <DepartInsertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                               currentSeq={item.departSeq} currentName={item.departName}
                               currentDescription={item.description}/>

        </li>
    );
};

export default DepartItem;
