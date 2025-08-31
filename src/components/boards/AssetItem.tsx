import type {Asset, AssetCategory} from "../../interfaces/Asset.ts";
import {getImages} from "../../axios/image.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGroupStore} from "../../store/groupStore.ts";


interface AssetItemProps {
    item: Asset;
}

interface Image {
    imageSeq: string;
    fileName: string;
    contentType: string;
    image: string;
}

const AssetItem = ({item}: AssetItemProps) => {
    const [imageData, setImageData] = useState<Image | null>(null);
    const selectedGroup = useGroupStore(state => state.selectedGroupSeq);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
            const res: Image = await getImages(item.imageUrl); // Promise 해제
            setImageData(res);
        };
        fetchImage();
    }, [item.imageUrl]);

    const detail = () => {
        return (
            navigate(`details/${selectedGroup}/?seq=${item.assetSeq}`)
        )
    }

    const imageUrl = imageData
        ? `data:${imageData.contentType};base64,${imageData.image}`
        : "/itman_header_logo.png";


    return (
        <tr className="border-b transition-colors data-[state=selected]:bg-muted cursor-pointer hover:bg-muted/50"
            onClick={() => detail()}>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                            src={imageUrl}
                            alt={item.assetName}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div>
                        <div className="font-medium text-gray-900">{item.assetName}</div>
                        <div className="text-sm text-gray-500">{item.serialNumber}</div>
                    </div>
                </div>
            </td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                <div className="flex gap-2 overflow-x-auto max-w-[300px] scrollbar-hide">
                    {item.categories?.map((c: AssetCategory) => (
                        <a key={c.assetCategorySeq} className="cursor-pointer shrink-0">
                            <span
                                className="inline-block px-2 py-1 text-sm font-medium rounded-md whitespace-nowrap"
                                style={{backgroundColor: c.category.tagColor, color: "#fff"}}
                            >
                              {c.category.categoryName}
                            </span>
                        </a>
                    ))}
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-1">
                    {item.location}
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                        {item.acqDate}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                    </div>
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{item.enabled ? "사용" : "미사용"}</td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5
                    text-xs font-semibold transition-colors focus:outline-none
                    focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary
                    text-primary-foreground hover:bg-primary/80">
                    미구현
                </div>
            </td>
        </tr>

    )
}


export default AssetItem