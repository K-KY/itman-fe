import React, {useState, useEffect} from 'react';
import {
    ArrowLeft,
    Edit2,
    Trash2,
    Calendar,
    Clock,
    MapPin,
    Tag,
    Hash,
    Image,
    ToggleLeft,
    ToggleRight,
    Users,
    AlertCircle
} from 'lucide-react';
import type {Asset} from "../../interfaces/Asset.ts";
import {getAssetsDetail} from "../../axios/asset.ts";
import {useGroupStore} from "../../store/groupStore.ts";
import {useSearchParams} from "react-router-dom";
import {getImages} from "../../axios/image.ts";
import {getGroupInfo, type GroupInfo} from "../../axios/group.ts";

interface AssetDetailsProps {
    assetSeq: number;
    onBack?: () => void;
    onEdit?: (assetSeq: number) => void;
    onDelete?: (assetSeq: number) => void;
}

interface Image {
    imageSeq: string;
    fileName: string;
    contentType: string;
    image: string;
}


const AssetDetails: React.FC<AssetDetailsProps> = ({
                                                       onBack = () => window.history.back(),
                                                       onEdit = () => {
                                                           console.log("수정 클릭")
                                                       },
                                                       onDelete = () => {
                                                           console.log("삭제 버튼 클릭")
                                                       }
                                                   }) => {


    const [searchParams] = useSearchParams();
    const assetSeq = Number(searchParams.get("seq"));
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);
    const [imageData, setImageData] = useState<Image | null>(null);


    const [asset, setAsset] = useState<Asset>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchAssetDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                // 자산 상세 정보 가져오기


                getAssetsDetail(assetSeq, selectedGroup)
                    .then(async res => {
                        if (!res) {
                            return;
                        }
                        setAsset(res);
                        const image: Image = await getImages(res.imageUrl); // Promise 해제
                        setImageData(image)
                    })
                    .catch(e => console.error(e));

                // 그룹 정보 가져오기 (groupSeq가 있을 경우)
            } catch (error) {
                console.error('Error fetching asset detail:', error);
                setError('자산 정보를 불러오는 데 실패했습니다.');

                const dummyData: Asset = {
                    assetSeq: null,
                    serialNumber: "SN-2024-001234",
                    imageUrl: "https://via.placeholder.com/400x300",
                    assetName: "Dell Latitude 5520 노트북",
                    groupSeq: 1,
                    location: "본사 3층 개발팀",
                    enabled: true,
                    del: false,
                    categories: [
                        {
                            assetCategorySeq: 1,
                            category: {
                                seq: 1,
                                name: "전자기기",
                                description: "전자 제품 카테고리",
                                del: false,
                                enabled: true,
                                createdDate: new Date("2024-01-15T10:30:00"),
                                updatedDate: new Date("2024-01-15T10:30:00")
                            },
                            del: false,
                            createdDate: new Date("2024-01-15T10:30:00"),
                            updatedDate: new Date("2024-01-15T10:30:00")
                        },
                        {
                            assetCategorySeq: 2,
                            category: {
                                seq: 2,
                                name: "노트북",
                                description: "노트북 컴퓨터",
                                del: false,
                                enabled: true,
                                createdDate: new Date("2024-01-15T10:30:00"),
                                updatedDate: new Date("2024-01-15T10:30:00")
                            },
                            del: false,
                            createdDate: new Date("2024-01-15T10:30:00"),
                            updatedDate: new Date("2024-01-15T10:30:00")
                        }
                    ],
                    acqDate: "2024-01-15",
                    createdDate: new Date("2024-01-15T10:30:00"),
                    updatedDate: new Date("2024-03-20T14:25:00")
                };


                // 개발 중 더미 데이터 (실제 배포시 제거)
                setAsset(dummyData);
            } finally {
                setLoading(false);
            }
        };

        if (assetSeq) {
            fetchAssetDetail();
        }
    }, []);

    const imageUrl = imageData
        ? `data:${imageData.contentType};base64,${imageData.image}`
        : "/itman_header_logo.png";

    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return '-';
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateTime?: Date) => {
        if (!dateTime) return '-';
        const date = new Date(dateTime);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    const [group, setGroup] = useState<GroupInfo>()

    useEffect( () => {
        async function getGroup(groupSeq: number) {
            const groupInfo = await getGroupInfo(groupSeq);
            setGroup(groupInfo)
            return groupInfo ? groupInfo.groupSeq : groupSeq;
        }

        if (selectedGroup != null) {
            getGroup(selectedGroup)
        }
    }, []);

    // const handleDelete = async () => {
    //     if (window.confirm('정말 이 자산을 삭제하시겠습니까?')) {
    //         try {
    //             await axios.delete(`http://localhost:8080/assets/${assetSeq}`, {
    //                 withCredentials: true
    //             });
    //             onDelete(assetSeq);
    //             onBack();
    //         } catch (error) {
    //             console.error('Failed to delete asset:', error);
    //             alert('자산 삭제에 실패했습니다.');
    //         }
    //     }
    // };

    //로딩 화면
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error && !asset) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4"/>
                <div className="text-gray-700 text-lg mb-2">자산 정보를 불러올 수 없습니다</div>
                <div className="text-gray-500 text-sm mb-4">{error}</div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    if (!asset) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-500">자산 정보를 찾을 수 없습니다.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5"/>
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">자산 상세 정보</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => asset.assetSeq && onEdit(asset.assetSeq)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                                <Edit2 className="w-4 h-4"/>
                                <span>수정</span>
                            </button>
                            <button
                                onClick={() => asset.assetSeq && onDelete(asset.assetSeq)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                            >
                                <Trash2 className="w-4 h-4"/>
                                <span>삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* 왼쪽: 이미지 섹션 */}
                        <div className="rounded-lg overflow-hidden">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={asset.assetName || '자산 이미지'}
                                    className="w-full h-auto block"
                                />
                            ) : (
                                <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100">
                                    <Image className="w-16 h-16 text-gray-400"/>
                                </div>
                            )}
                        </div>

                        {/* 오른쪽: 기본 정보 */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {asset.assetName || '이름 없음'}
                                </h2>
                                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      asset.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {asset.enabled ? (
                        <>
                            <ToggleRight className="w-4 h-4 mr-1"/>
                            사용 중
                        </>
                    ) : (
                        <>
                            <ToggleLeft className="w-4 h-4 mr-1"/>
                            미사용
                        </>
                    )}
                  </span>
                                    {asset.del && (
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      삭제됨
                    </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {asset.serialNumber && (
                                    <div className="flex items-start space-x-3">
                                        <Hash className="w-5 h-5 text-gray-400 mt-0.5"/>
                                        <div>
                                            <p className="text-sm text-gray-500">시리얼 번호</p>
                                            <p className="font-mono font-medium">{asset.serialNumber}</p>
                                        </div>
                                    </div>
                                )}


                                {selectedGroup && (
                                    <div className="flex items-start space-x-3">
                                        <Users className="w-5 h-5 text-gray-400 mt-0.5"/>
                                        <div>
                                            <p className="text-sm text-gray-500">소속 그룹</p>
                                            <p className="font-medium">{group?.groupName}</p>
                                        </div>
                                    </div>
                                )}

                                {asset.location && (
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5"/>
                                        <div>
                                            <p className="text-sm text-gray-500">위치</p>
                                            <p className="font-medium">{asset.location}</p>
                                        </div>
                                    </div>
                                )}

                                {asset.acqDate && (
                                    <div className="flex items-start space-x-3">
                                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5"/>
                                        <div>
                                            <p className="text-sm text-gray-500">취득 일자</p>
                                            <p className="font-medium">{formatDate(asset.acqDate)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 카테고리 */}
                            {asset.categories && asset.categories.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <Tag className="w-5 h-5 text-gray-400"/>
                                        <h3 className="text-sm font-medium text-gray-500">카테고리</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {asset.categories.filter(cat => !cat.del && cat.category.enabled).map((cat) => (
                                            <span
                                                key={cat.assetCategorySeq}
                                                className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium"
                                                title={cat.category.description}
                                            >
                        {cat.category.name}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 하단: 메타 정보 */}
                    <div className="bg-gray-50 px-8 py-4 border-t">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4"/>
                                <span>등록일: {formatDateTime(asset.createdDate)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4"/>
                                <span>수정일: {
                                    asset.updatedDate === asset.createdDate ? "-" : formatDate(asset.updatedDate)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 카테고리 상세 정보 */}
                {asset.categories && asset.categories.length > 0 && (
                    <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리 상세 정보</h3>
                        <div className="space-y-4">
                            {asset.categories.map((cat) => (
                                <div
                                    key={cat.assetCategorySeq}
                                    className={`border rounded-lg p-4 transition-colors ${
                                        cat.del || !cat.category.enabled
                                            ? 'bg-gray-50 opacity-60'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-medium text-gray-900">
                                                    {cat.category.name}
                                                </h4>
                                                {(cat.del || !cat.category.enabled) && (
                                                    <span
                                                        className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">
                            {cat.del ? '삭제됨' : '비활성'}
                          </span>
                                                )}
                                            </div>
                                            {cat.category.description && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {cat.category.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            <p>등록: {formatDateTime(cat.createdDate)}</p>
                                            <p>수정: {formatDateTime(cat.updatedDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetDetails;