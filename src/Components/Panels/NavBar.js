
export default function NavBar() {



    return (

        <>
            <nav id="main-navbar" className="navbar navbar-expand-lg bg-white fixed-top">

                <div className="container-fluid">

                    <button data-mdb-button-init className="navbar-toggler" type="button" data-mdb-collapse-init data-mdb-target="#sidebarMenu"
                        aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>


                    <a className="navbar-brand" href="#">
                        <img src="#" height="25" alt="MDB Logo"
                loading="lazy" />
                    </a>

                    <form className="d-none d-md-flex input-group w-auto my-auto">
                        
                    </form>


                    <ul className="navbar-nav ms-auto d-flex flex-row">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Separated link</a>
                            </div>
                        </li>


                        <li className="nav-item dropdown">
                            <a data-mdb-dropdown-init className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow" href="#" id="navbarDropdown"
                                role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                <i className="united kingdom flag m-0"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="#"><i className="united kingdom flag"></i>English
                                        <i className="fa fa-check text-success ms-2"></i></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#"><i className="flag-poland flag"></i>French</a>
                                </li>
                                
                            </ul>
                        </li>


                        <li className="nav-item dropdown">
                            <a data-mdb-dropdown-init className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#"
                                id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                <img src="#" className="rounded-circle"
                                    height="22" alt="Avatar" loading="lazy" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">My profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </nav>
        </>

    );
}