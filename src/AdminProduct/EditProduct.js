import { useLocation } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
function EditProduct(){
  
    const loaction =useLocation();
    console.log(loaction.state);    
    const product1={...loaction.state}
    const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: `${product1.name}`,
      description: `${product1.description}`,
      price: `${product1.price}`,
      rating: `${product1.rating}`,
      category: `${product1.category}`,
      quantity: `${product1.quantity}`,
    },
    onSubmit: (values) => {
      
      const token = sessionStorage.getItem("token");
      const product = {
        name: values.name,
        description: values.description,
        price: values.price,
        rating: values.rating,
        category: values.category,
        quantity: values.quantity,
      };
      axios
        .put(`https://localhost:7165/api/Admin/updateProduct?Id=${product1.id}`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          navigate("/Product");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate:(values) =>{
        let error={}
        if(!values.name){
            error.name="Product Name  Required";
        }
        if(!values.description){
            error.description="Product Description Required";
        }
        if(!values.price){
            error.price="Product price Required";

        }
        if(!values.category){
            error.category="Product Category Required"
        }
        if(!values.rating){
            error.rating="Product rating Required"
        }
        if(!values.quantity){
            error.quantity="Product quantity Required"
        }
        return error;
    }
  });
   return (
   <>
     <NavBar></NavBar>
    <div className="container">
      <form onSubmit={formik.handleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter product name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.onBlur}
          />
         {formik.touched.name && formik.errors.name ? (<div style={{ color: 'red' }}>{formik.errors.name}</div>):null}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Enter product description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.onBlur}
          />
          {formik.touched.description && formik.errors.description ? (<div style={{color:'red'}}> {formik.errors.description}</div>):null }
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Product Price
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Enter product price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.onBlur}
          />
             {formik.touched.price && formik.errors.price ? (<div style={{color:'red'}}> {formik.errors.price}</div>):null }
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Product Rating
          </label>
          <input
            type="text"
            className="form-control"
            name="rating"
            placeholder="Enter product rating"
            onChange={formik.handleChange}
            value={formik.values.rating}
            onBlur={formik.onBlur}
          />
             {formik.touched.rating && formik.errors.rating ? (<div style={{color:'red'}}> {formik.errors.rating}</div>):null }
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Product Category
          </label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Enter product category"
            onChange={formik.handleChange}
            value={formik.values.category}
            onBlur={formik.onBlur}
          />
             {formik.touched.category && formik.errors.category ? (<div style={{color:'red'}}> {formik.errors.category}</div>):null }
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Product Quantity
          </label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            placeholder="Enter product quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
            onBlur={formik.onBlur}
          />
             {formik.touched.quantity && formik.errors.quantity ? (<div style={{color:'red'}}> {formik.errors.quantity}</div>):null }
        </div>
        <button type="submit" className="btn btn-primary">
         Edit
        </button>
      </form>
      </div>
   </>
   ); 
}
export default EditProduct;