import NavBar from "./Navbar/NavBar";
import SideBar from "./Sidebar/SideBar";
import { Outlet } from "react-router-dom";
export default function Header() {
    const navbarHeight = 0;


    return (

        <>
            <NavBar />           
            <div className="d-flex" style={{ marginTop: `${navbarHeight}px` }}>
                <header>
                    <SideBar />                    
                </header>
                <main className="flex-grow-1 p-4">
                    <Outlet /> {/* All pages renders here */}
                </main>
            </div>
        </>

    );
}