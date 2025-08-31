import {useNavigate} from "react-router-dom";

const AssetDetails = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1); // -1은 브라우저 히스토리에서 한 단계 뒤로 가기
    };


    return (
        <div>
            <h2>
                자산 상세
            </h2>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">그룹 목록</h1>
                <button
                    onClick={() => goBack()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    뒤로 가기
                </button>
            </div>


        </div>
    )
}

export default AssetDetails;