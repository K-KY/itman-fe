import type {Employee} from "../../interfaces/Employee.ts";


interface EmployeeItemProps {
    item: Employee;
}
const EmployeeItem = ({item} : EmployeeItemProps) => {
    return (
        <tr className="border-b transition-colors data-[state=selected]:bg-muted cursor-pointer hover:bg-muted/50">
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-medium">{item.empName}</div>
                        <div className="text-sm text-muted-foreground">{item.job}미구현</div>
                    </div>
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-mono">{item.empNum}</td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{item.departDto?.name}</td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-1">
                    <img src={"/team_leader.svg"} alt="" />
                    {item.position}미구현
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-mail h-3 w-3">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        {item.empEmail}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-phone h-3 w-3">
                            <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        {item.empPhone}
                    </div>
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{item.hired}미구현</td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5
                    text-xs font-semibold transition-colors focus:outline-none
                    focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary
                    text-primary-foreground hover:bg-primary/80">
                    {item.empStatus}미구현
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{item.manager ? item.manager.empName : "없음"}</td>
        </tr>

    )
}

export default EmployeeItem