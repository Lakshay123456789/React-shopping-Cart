import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../AdminProduct/NavBar";

function AllInvoice() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getAllInvoices();
  }, []);

  function getAllInvoices() {
    const token = sessionStorage.getItem('token');
    axios.get("https://localhost:7165/api/Admin/AllUserOrders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setInvoices(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <NavBar />
      <div className="container">
        {invoices.length === 0 ? (
          <h2>No Invoice Created by Any User!</h2>
        ) : (
          <div className="row">
            <h1>All Invoices</h1>
            {invoices.map((invoice) => (
              <div key={invoice.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">User ID: {invoice.identityUserId}</h5>
                    <p className="text">Order Date: {invoice.orderDate}</p>
                    <p className="text">Total Tax: {invoice.totalTax}</p>
                    <p className="text">Total Amount: {invoice.totalAmount}</p>
                    {invoice.orderProductss.map((item) => (
                      <div key={item.id} className="card">
                        <div className="card-body">
                          <h3 className="text">Order ID: {item.orderId}</h3>
                          <p className="text">Product ID: {item.productId}</p>
                          <p className="text">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllInvoice;
