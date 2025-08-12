import {create} from "zustand/react";
import { persist } from 'zustand/middleware'

interface GroupStore {
    selectedGroupSeq: number|null;
    setSelectedGroupSeq: (groupSeq: number) => void;
}

// export const useGroupStore = create<GroupStore>((set) => ({
//     selectedGroupSeq: 0,
//     setSelectedGroupSeq: (groupSeq) => set({ selectedGroupSeq: groupSeq }),
// }));

export const useGroupStore = create<GroupStore>()(
    persist(
        (set) => ({
            selectedGroupSeq: null,
            setSelectedGroupSeq: (groupSeq: number | null) => set({ selectedGroupSeq: groupSeq }),
        }),
        {
            name: "group-storage",
            // localStorage 외 다른 저장소를 사용하려면 storage 옵션 추가 가능
            // storage: customStorage,
        }
    )
);
