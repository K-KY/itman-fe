import {useEffect, useState} from "react";
import {type Depart} from "../../axios/depart.ts"
import ImageUploader from "../imageUploader.tsx";
import {LabelInput} from "../utils/labelInput.tsx";
import InfiniteDropdown from "../dropDown.tsx";
import type {Employee} from "../../interfaces/Employee.ts";
import {post} from "../../axios/emplyee.ts";


const NewEmployee = () => {
    const [selectedDepart, setSelectedDepart] = useState<Depart | null>(null);
    // const formData = {
    //     name: (e.target as any).name.value,
    //     empNum: (e.target as any).empNum.value,
    //     email: (e.target as any).email.value,
    //     tel: (e.target as any).tel.value,
    //     departId: selectedDepart?.id, // 중요: 상태에서 가져온 외래키
    //     // TODO: 나머지 필드도 추가
    // }

    const [empInfo, setEmpInfo] = useState<Employee>({
        profile: null,
        empSeq: null,
        empName: '',
        empNum: '',
        enoNumber: '',
        empEmail: '',
        empPhone: '',
        departDto: selectedDepart,
        manager: null,
        del: false,
        position: null,
        job: null,
        hired: null,
        state: null,
        empStatus: null,
    })

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setEmpInfo(prev => ({
            ...prev,
            [id]: value
        }));
        console.log(empInfo)
    };

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setEmpInfo(prev => ({
            ...prev,
            [id]: value
        }));
        console.log(empInfo)
    };

    const handleFileChange = (file: File | null) => {
        setEmpInfo((prev) => ({
            ...prev,
            profile: file,
        }));
    };

    useEffect(() => {
        setEmpInfo(prev => ({
            ...prev,
            departDto: selectedDepart
        }))
    },[selectedDepart])


    const handleSubmit = () => {
        post(empInfo)
        console.log(empInfo)
    }

    return (
        <div>
            <h3 className={"font-bold text-3xl p-3"}>직원 등록</h3>

            <form className={"space-y-6"}>
                <div className={"grid gap-6 lg:grid-cols-2"}>
                    <div className={"m-3 border-2 rounded-lg shadow-sm flex flex-col"}>
                        <h3 className={"p-2 font-bold text-2xl"}>개인 정보</h3>
                        <div className={"border space-y-2"}>
                            <label className={"p-4 font-bold"}>프로필 사진</label>
                            <ImageUploader onFileChange={(file) => handleFileChange(file)}/>
                        </div>

                        <div className={"p-4 space-y-6 border-2 rounded-lg shadow-sm"}>
                            {/* 이름 */}
                            <LabelInput
                                id="empName"
                                type="text"
                                text="이름"
                                required={true}
                                onChange={handlePersonalChange}
                            />


                            {/* 사원번호 DB에 없는 필드 */}
                            <LabelInput id={"empNum"}
                                        type={"text"}
                                        text={"사원번호"}
                                        required={true}
                                        onChange={handlePersonalChange}/>


                            {/* 이메일 DB에 없는 필드*/}
                            <LabelInput id={"empEmail"}
                                        type={"email"}
                                        text={"이메일"}
                                        required={true}
                                        onChange={handlePersonalChange}/>


                            {/* 연락처 DB에 없는 필드*/}
                            <LabelInput id={"empPhone"}
                                        type={"tel"}
                                        text={"연락처"}
                                        required={true}
                                        onChange={handlePersonalChange}/>

                        </div>
                    </div>

                    <div className={"m-3 border-2 rounded-lg shadow-sm flex flex-col"}>
                        <h3 className={"p-2 font-bold text-2xl"}>업무 정보</h3>

                        <div className={"p-4 space-y-6border-2 rounded-lg shadow-sm"}>
                            <div className="space-y-4">
                                {/* 전부 부서, 담당자, 직무, 직책, 재직상태는 외래키로 연결 되어야함
                                토글 무한 스크롤, 검색으로 변경 */}
                                <InfiniteDropdown
                                    value={selectedDepart}
                                    onChange={(newDepart) => setSelectedDepart(newDepart)}
                                    label="부서 선택"
                                />
                                <LabelInput id={"name"} type={"text"} text={"담당자"} required={false}/>
                                <LabelInput id={"name"} type={"text"} text={"직무"} required={false}/>
                                <LabelInput id={"name"} type={"text"} text={"직책"} required={false}/>
                                <LabelInput id={"name"} type={"text"} text={"입사일"} required={false}/>
                                <LabelInput id={"name"} type={"text"} text={"재직상태"} required={false}/>
                            </div>

                        </div>


                    </div>
                </div>
                <button   onClick={() => handleSubmit()}
                          >추가</button>

            </form>
        </div>
    )
}

export default NewEmployee;
