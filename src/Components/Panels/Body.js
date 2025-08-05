export default function Body({ children }) {

    return (

        <>
            <main style={{ marginTop: 58, height: "100%" }}>
                <div className="container-fluid pt-4">
                    {children}
                </div>
            </main>
        </>

    );
}