import { useLocation, useNavigate } from "react-router-dom";

function Invoice() {
  debugger
  const location = useLocation();

  const navigate=useNavigate();
  const ProductInvoice = { ...location.state };
  const ProductPrice = parseFloat(ProductInvoice.productPrice) * parseInt(ProductInvoice.productQuantity);
  const tax=ProductPrice * 0.18;
  const totalPrice = ProductPrice + tax; 
  ProductInvoice.totalPrice=totalPrice;
  ProductInvoice.Tax=tax;
 console.log(ProductInvoice);

 if (localStorage && localStorage.getItem(ProductInvoice.identityUserId) === null) {
  const StoreInvoice = [];
  StoreInvoice.push(ProductInvoice);
  localStorage.setItem(ProductInvoice.identityUserId, JSON.stringify(StoreInvoice));
} else {
  let data = localStorage.getItem(ProductInvoice.identityUserId);
  data = JSON.parse(data);
  const index = data.findIndex(element => element.id === ProductInvoice.id);
  if (index === -1) {
    data.push(ProductInvoice);
    localStorage.setItem(ProductInvoice.identityUserId, JSON.stringify(data));
  }
  
}

function DeleteInvoice(id) {

  let KeyProduct = sessionStorage.getItem('userId');
  const data = JSON.parse(localStorage.getItem(KeyProduct));
  const index = data.findIndex(element => element.id === id);
  if (index !== -1) {
    data.splice(index, 1);

  }
     navigate('/Cart')
}


  return (
    <div className="container">
      <div className="card-title" style={styles.title}> Name: {ProductInvoice.productName}</div>
      <p className="text" style={styles.description}> Description: {ProductInvoice.productDescription}</p>
      <p className="text" style={styles.price}> Price: {ProductInvoice.productPrice}</p>
      <p className="text" style={styles.rating}> Rating: {ProductInvoice.productRating}</p>
      <p className="text" style={styles.quantity}> Quantity: {ProductInvoice.productQuantity}</p>
      <p className="text" style={styles.totalPrice}> Actual Price: {ProductInvoice.productPrice}</p>
      <p className="text" style={styles.totalPrice}> Product Tax(18% GST): {ProductInvoice.Tax}</p>
      <p className="text" style={styles.totalPrice}> Total Price: {totalPrice.toFixed(2)}</p>
      <button className="btn btn-danger" onClick={()=>{
        DeleteInvoice(ProductInvoice.id)
      }}>DeleteInvoice</button>
    </div>
  );
}

const styles = {
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  price: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  rating: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  quantity: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  totalPrice: {
    fontSize: "14px",
    marginBottom: "5px",

  },
};

export default Invoice;
