import type {DepartData} from "../axios/depart.ts";

interface DepartItemProps {
    item: DepartData;
}

const DepartItem = ({item}: DepartItemProps) => {

    return (
        <>
            <li
                key={item.departSeq}
                className="p-4 flex flex-col sm:flex-row
                            sm:items-center sm:justify-between hover:bg-gray-50">
                <div>
                    <p className="text-lg font-semibold text-gray-800">{item.departName}</p>
                    <p className="text-sm text-gray-500">부서 번호: {item.departSeq}</p>
                    <p className="text-sm text-gray-400">
                        생성일: {new Date(item.createdDate).toLocaleDateString()} / 수정일:{" "}
                        {new Date(item.updatedDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-2 sm:mt-0">
                    {item.del ? (
                        <span
                            className="inline-block px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md">
                                        삭제됨
                    </span>
                    ) : (
                        <span
                            className="inline-block px-2 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-md">
                                        활성
                    </span>
                    )}
                </div>
            </li>
        </>
    )
}

export default DepartItem