import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import NavBar  from "../AdminProduct/NavBar";
function User() {
  const [products, setProducts] = useState([]);
  const [currentpage,setpage]=useState(1);
  const [pageSize,setpageSize]=useState(2);
  const [totalpage,setTotalPage]=useState(2);
  const [search, setSearch] = useState("");
  // const navigate =useNavigate();
  useEffect(() => {
    getAllProducts();
  }, [currentpage,pageSize,search]);

 function AddCard(...product){
  const token = sessionStorage.getItem("token");
  const userId=sessionStorage.getItem("userId");
  const [ id,name,description,price,rating,quantity,Category]=product;
      console.log(id);
   
      const card={
        "productId":`${id}`,
        "ProductName":`${name}`,
        "ProductDescription":`${description}`,
        "ProductPrice":`${price}`,
        "ProductRating":`${rating}`,
        "ProductQuantity":`${quantity}`,
        "identityUserId":`${userId}`,
        "productCategory":`${Category}`

      }
    axios.post(`https://localhost:7165/api/User/AddToCarts`,card,{
    headers:{ Authorization : `Bearer ${token} `},
   }).then((resp)=>{
    console.log(resp.data)
    // navigate('/Cart');
    getAllProducts();
   }).catch((er)=>{
    console.log(er.data)
    
   })

   
 }
  function getAllProducts() {
    const token = sessionStorage.getItem("token");
    axios
      .get(`https://localhost:7165/api/User/getProducts?page=${currentpage}&pageSize=${2}&search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
        setTotalPage(response.data.totalPage);
        setpageSize(response.data.totalCount)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleChange = (event, value) => {
    setpage(value);
  };
  
  return (
    <>
          
      <NavBar></NavBar>
      <input value={search} onChange={e => setSearch(e.target.value.trim())} id="search" class="float-end mt-3 me-4" placeholder="Search Here"/>    
    <div className="container">
      <h1>All Products </h1>
      <div className="row">
        {
          products.length ===0? (<h2>No product exist</h2>) :(
               products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Product Name:-{product.name}</h5>
                <p className="card-text"> {product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Rating: {product.rating}</p>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
                {
                  product.quantity !== 0 && (    <button className="btn btn-primary" onClick={ () =>{AddCard(product.id,product.name,product.description,product.price,product.rating,product.quantity,product.category)}}>Add To Cart</button> ) 
                }
               {
                  product.quantity === 0 && (<p className="btn btn-danger">Out Of Stock </p>) 
                }
              </div>
            </div>
          </div>
        ))
          )
        }
   
      </div>
      <Pagination count={totalpage} page={currentpage} onChange={handleChange} color="primary" />
    </div>
   
    </>
  );
}

export default User;
