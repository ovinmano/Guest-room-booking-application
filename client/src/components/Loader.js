import React , {useState} from 'react'
import PuffLoader from "react-spinners/PuffLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    return (
        <div style={{marginTop:'120px'}} className="text-center">
            <center><div className="sweet-loading">

                <PuffLoader color='#000' loading={loading} css='' size={90} />
            </div></center>
        </div>
    )
}
export default Loader;