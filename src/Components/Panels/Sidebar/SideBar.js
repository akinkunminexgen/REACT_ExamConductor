import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSidebar } from "./SideBarContext";
import { FaTachometerAlt, FaChartArea, FaClipboardList, FaSignInAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function SideBar() {
    const { openMenu, toggleMenu } = useSidebar();
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsCollapsed(window.innerWidth < 1400);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav
            id="sidebarMenu"
            className={`bg-white border-end vh-100 d-flex flex-column transition-all ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
            style={{ position: "sticky", paddingTop: 56, height: "calc(100vh - 56px)" }}
        >
            <div className="flex-grow-1 overflow-auto">
                <div className="list-group list-group-flush mx-2 mt-4">

                    {/* Examination Menu */}
                    <div className="position-relative">
                        <button
                            className="list-group-item list-group-item-action py-2 ripple d-flex align-items-center"
                            onClick={() => toggleMenu("menu1")}
                        >
                            <FaTachometerAlt className="me-3 fs-5" />
                            {!isCollapsed && (
                                <>
                                    <span>Examination</span>
                                    <i className="ms-auto">{openMenu === "menu1" ? <FaChevronUp /> : <FaChevronDown />}</i>
                                </>
                            )}
                        </button>

                        {/* Submenu */}
                        {openMenu === "menu1" && (
                            <ul className={`list-group list-group-flush ${isCollapsed ? "flyout-menu" : "ms-4"}`}>
                                <li className="list-group-item py-1 border-0 d-flex align-items-center">
                                    <FaSignInAlt className="me-3 fs-5" />
                                    <Link to="/" className="text-reset text-decoration-none">Login</Link>
                                </li>
                                <li className="list-group-item py-1 border-0 d-flex align-items-center">
                                    <FaClipboardList className="me-3 fs-5" />
                                    <Link to="/Dashboard" className="text-reset text-decoration-none">Dashboard</Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Admin Menu */}
                    <div className="position-relative">
                        <button
                            className="list-group-item list-group-item-action py-2 ripple d-flex align-items-center"
                            onClick={() => toggleMenu("menu2")}
                        >
                            <FaChartArea className="me-3 fs-5" />
                            {!isCollapsed && (
                                <>
                                    <span>Admin</span>
                                    <i className="ms-auto">{openMenu === "menu2" ? <FaChevronUp /> : <FaChevronDown />}</i>
                                </>
                            )}
                        </button>

                        {openMenu === "menu2" && (
                            <ul className={`list-group list-group-flush ${isCollapsed ? "flyout-menu" : "ms-4"}`}>
                                <li className="list-group-item py-1 border-0">
                                    <FaSignInAlt className="me-3 fs-5" />
                                    <Link to="/" className="text-reset text-decoration-none">Login</Link>
                                </li>
                                <li className="list-group-item py-1 border-0">
                                    <Link to="/students" className="text-reset text-decoration-none">Students</Link>
                                </li>
                                <li className="list-group-item py-1 border-0">
                                    <Link to="/questions" className="text-reset text-decoration-none">Questions</Link>
                                </li>
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
