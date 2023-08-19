
import { useNavigate } from "react-router-dom";

function Logout(){

    const navigate=useNavigate();
     sessionStorage.clear();
     navigate('/');
}
export default Logout;