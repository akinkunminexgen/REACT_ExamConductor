
import { Button } from "reactstrap";;
export default function Paginate({ currentPage, totalPages, goToPage }) {
   
  
    return (

        <>
            
            <div className="d-flex justify-content-center mt-4">
                <Button color="primary" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous{"<<" }
                </Button>
                <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
                <Button color="primary" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next{">>"}
                </Button>
            </div>
            
        </>

    );
}