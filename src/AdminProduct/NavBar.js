import { Link,NavLink } from "react-router-dom";
function NavBar(){
   const username=sessionStorage.getItem("username");
   const role=sessionStorage.getItem("role");
   return(
    <>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {
          role ==="Admin" && (<><Link to="/Product" className="navbar-brand">My Shopping</Link> </>)
        }
      
        {
          role ==="User" && (<><Link to="/User" className="navbar-brand">My Shopping</Link> </>)
        }

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
            
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
          { 
          role ==="Admin" && ( <><li className="text-light nav-item" style={styles.userName}> 
            {username}
            </li>
            <li className="nav-item ">
              <NavLink  to="/Allinovice" className="nav-link">AllInvoice</NavLink >
             </li>
            </>
            )
         
            }
            {
              role ==="User" && ( <><li className="text-light nav-item" style={styles.userName}> 
              {username}
              </li>
              <li className="nav-item ">
              <NavLink  to="/Cart" className="nav-link">Cart</NavLink >
             </li>
             <li className="nav-item ">
              <NavLink  to="/CreateInvoice" className="nav-link">AllCreateInvoice</NavLink >
             </li>
              </>
              )
            }
               <li className="nav-item ">
               <NavLink  to="/Logout" className="nav-link" style={{position:"absolute",top:"5px",right:"20px"}}>Logout</NavLink >
               </li>
            
          </ul>
        </div>
      </div>
    </nav>
  
    </>
)
}
export default NavBar;
const styles ={
  userName:{
    position:"absolute",
    right:"99px",
    top:"13px"
  }
}