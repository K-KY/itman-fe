interface SideBarProps {
    src : string;
    url : string;
    text : string;
}

const SideBar = () => {
    return (
        <div className="flex h-screen" >
                <nav className="w-64 bg-gray-200 p-4 h-full" style={{ boxShadow: 'inset -12px 0 10px rgba(0,0,0,0.1)' }}>
                    <SideBarItems src={"/dashboard.svg"} url={"/dashboard"} text={"대시보드"}></SideBarItems>
                    <SideBarItems src={"/asset_manage.svg"} url={"/assets"} text={"자산 관리"}></SideBarItems>
                    <SideBarItems src={"/employee_manage.svg"} url={"/employees"} text={"직원 관리"}></SideBarItems>
                    <SideBarItems src={"/depart_manage.svg"} url={"/departs"} text={"부서 관리"}></SideBarItems>
                    <SideBarItems src={"/position.svg"} url={"/positions"} text={"직위 관리"}></SideBarItems>
                    <SideBarItems src={"/jobs.svg"} url={"/jobs"} text={"직무 관리"}></SideBarItems>
                    <SideBarItems src={"/contractor_manage.svg"} url={"/contractors"} text={"구매처 관리"}></SideBarItems>
                    <SideBarItems src={"/location.svg"} url={"/location"} text={"위치 관리"}></SideBarItems>
                    <SideBarItems src={"/asset_manage.svg"} url={"/category"} text={"카테고리 관리"}></SideBarItems>
                    <SideBarItems src={"/asset_manage.svg"} url={"/state"} text={"상태 관리"}></SideBarItems>
                    <SideBarItems src={"/reports.svg"} url={"/reports"} text={"보고서"}></SideBarItems>
                    <SideBarItems src={"/setting.svg"} url={"/settings"} text={"설정"}></SideBarItems>
                </nav>
        </div>

    )
}

const SideBarItems = (items : SideBarProps) => {
    return (
        <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                transition-colors text-sidebar-foreground hover:bg-sidebar-accent
                hover:bg-gray-300
                hover:text-sidebar-accent-foreground"
            href={`${items.url}`}>
            <img src={`${items.src}`} alt={`${items.text}`}/>
            {items.text}
        </a>
    )
}
export {SideBar}
export {SideBarItems}