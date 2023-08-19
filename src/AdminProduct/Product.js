import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import NavBar from "./NavBar";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Product() {
  let [product, setProduct] = useState([]);
  const [currentpage,setpage]=useState(1);
  const [pageSize,setpageSize]=useState(2);
  const [totalpage,setTotalPage]=useState(2);
  const [search, setSearch] = useState("");

  const navigate=useNavigate();

  useEffect(() => {
    
    GetAllProduct();
    // toast.success('You are Logging Successfully ');
  },[currentpage,pageSize,search]);



  
  function GetAllProduct() {
    const token = sessionStorage.getItem("token");
    axios
      .get(`https://localhost:7165/api/Admin/GetProducts?page=${currentpage}&pageSize=${2}&search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setProduct(response.data.products);
        setTotalPage(response.data.totalPage);
        setpageSize(response.data.totalCount)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function ProductDelete(id) {
     let confirmDelete=window.confirm("Are you sure for Delete this product ");
     if(confirmDelete === true){
      const token = sessionStorage.getItem("token");
      axios
        .delete(`https://localhost:7165/api/Admin/DeleteProduct?Id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          console.log(resp.data);
          GetAllProduct();
        })
        .catch((er) => {
          console.log(er.error);
        });
     }else{
      
      GetAllProduct();
     }

    
  }
  
  function ProductEdit(id){
    const token = sessionStorage.getItem("token");
    axios.get(`https://localhost:7165/api/Admin/GetProductById?Id=${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }   
    }).then((resp)=>{
      console.log(resp.data);
      // navigate(`/${resp.data}`)
      navigate('/EditProduct',{state: resp.data})

    })
    .catch((er)=>{
      console.log(er.data);
    })

  }

  const handleChange = (event, value) => {
    setpage(value);
  };
  
 

  return (
    <>
    <NavBar></NavBar>
    <input value={search} onChange={e => setSearch(e.target.value.trim())} id="search" class="float-end mt-3 me-4" placeholder="Search Here"/>    
    <div className="container m-3 ">
    <Link to='/AddProduct'  className="btn btn-primary m-2">AddNewProduct</Link>

      <table style={{ borderCollapse: "collapse", width: "100%" ,margin:"10px"}}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Price</th>
            <th style={styles.tableHeader}>Rating</th>
            <th style={styles.tableHeader}>Category</th>
            <th style={styles.tableHeader}>Quantity</th>
            <th style={styles.tableHeader}></th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
              <td style={styles.tableCell}>{item.name}</td>
              <td style={styles.tableCell}>{item.description}</td>
              <td style={styles.tableCell}>{item.price}</td>
              <td style={styles.tableCell}>{item.rating}</td>
              <td style={styles.tableCell}>{item.category}</td>
              <td style={styles.tableCell}>{item.quantity}</td>
              <td style={styles.tableCell}>
                <button onClick={() => ProductDelete(item.id)} style={styles.deleteButton}>
                  Delete
                </button>
                <button onClick={() => ProductEdit(item.id)} style={styles.editButton}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
          <Pagination count={totalpage} page={currentpage} onChange={handleChange} color="primary" />
      </div>
    </>
  );
}

const styles = {
  tableHeader: {
    padding: "8px",
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
  },
  tableRowOdd: {
    backgroundColor: "#fff",
  },
  tableCell: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight:"10px"
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  
};

export default Product;




