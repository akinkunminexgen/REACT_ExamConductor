export default function SideBar() {



    return (

        <>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
                <div className="position-sticky">
                    <div className="list-group list-group-flush mx-3 mt-4">
                        
                        <a className="list-group-item list-group-item-action py-2 ripple" aria-current="true"
                            data-mdb-collapse-init href="#collapseExample1" aria-expanded="true"
                            aria-controls="collapseExample1">
                            <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Expanded menu</span>
                        </a>
                        
                        <ul id="collapseExample1" className="collapse show list-group list-group-flush">
                            <li className="list-group-item py-1">
                                <a href="/home" className="text-reset">Link</a>
                            </li>
                        </ul>
                        

                       
                        <a className="list-group-item list-group-item-action py-2 ripple" aria-current="true"
                            data-mdb-collapse-init href="#collapseExample2" aria-expanded="true"
                            aria-controls="collapseExample2">
                            <i className="fas fa-chart-area fa-fw me-3"></i><span>Collapsed menu</span>
                        </a>
                        
                        <ul id="collapseExample2" className="collapse list-group list-group-flush">
                            <li className="list-group-item py-1">
                                <a href="" className="text-reset">Link</a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>

        </>

    );
}