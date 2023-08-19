import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../AdminProduct/NavBar";

function CreateInvoice() {
  const navigate = useNavigate();
  const [ProductInvoice, SetProductInvoice] = useState([]);

  useEffect(() => {
    AllInvoice();
  }, []);

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  function AllInvoice() {
   
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    axios.get(`https://localhost:7165/api/User/GetOrdersByUserId?identityUserId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((rep) => {
      console.log(rep.data)
      SetProductInvoice(rep.data);
    

    }).catch((er) => {
      console.log(er.data);
    })
  }
  function DeleteInvoice(id) {
    const token = sessionStorage.getItem('token');
    axios.delete(`https://localhost:7257/api/User/deleteInvoice/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((rep) => {
      navigate('/User')
    }).catch((er) => {
      console.log(er.data);
    })

  }
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        {
          ProductInvoice.length === 0 ? (<h2>No Invoice Carted !</h2>) :
            (<>
          <div className="row">
            <h1>All Invoices</h1>
            
            {ProductInvoice.map((invoice) => (
              <div key={invoice.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">User ID: {invoice.identityUserId}</h5>
                    <p className="text">Order Date: {
                   //  new Date(invoice.orderDate).toLocaleString()
                   //login format here
                   formatDateTime(invoice.orderDate)
                    }</p>
                    <p className="text">Total Tax: {invoice.totalTax}</p>
                    <p className="text">Total Amount: {invoice.totalAmount}</p>
                    { invoice.orderProductss.map((item) => (
                      <div key={item.id} className="card">
                        <div className="card-body">
                          <h3 className="text">Order ID: {item.orderId}</h3>
                          <p className="text">Product ID: {item.productId}</p>
                          <p className="text">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                     <button onClick={() => DeleteInvoice(invoice.id)} >
                        DeleteInvoice
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </>)
        }
      </div>
    </>
  );
}
export default CreateInvoice;