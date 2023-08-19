import axios from "axios";
import { useEffect, useState } from "react";
// import {useNavigate } from "react-router-dom";
import NavBar from "../AdminProduct/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {

  const [Cartdata, SetData] = useState([]);

  useEffect(() => {
    Cart();
  }, []);


  // delete function 

  function DeleteFromCard(id) {
    const token = sessionStorage.getItem('token');
    axios.delete(`https://localhost:7165/api/User/DeletefromCartParticular?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((rep) => {
      Cart();
    }).catch((er) => {
      console.log(er.data);
    })
  }

// Create Invoice

  function ProductInvoice() {
    console.log(Cartdata);
    const token = sessionStorage.getItem('token');
    axios.post('https://localhost:7165/api/User/PlaceOrder', Cartdata, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((resp) => {
        console.log(resp.data);

        Cartdata.forEach(element => {
          DeleteFromCard(element.id)
        });

        
        toast.success("invoice Created successfully")

      }).catch((er) => {
        console.log(er.data);
      })
  }

  function Cart() {

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem("userId");
    axios.get(`https://localhost:7165/api/User/GetUserCart?Id=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((resp) => {
        console.log(resp.data);
        SetData(resp.data);
      })
      .catch((er) => {
        console.log(er.data)
      })
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="container m-3">
        {Cartdata.length === 0 ? (
          <h2>Card is Empty !</h2>
        ) : (
          <table
            style={{ borderCollapse: "collapse", width: "100%", margin: "10px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Description</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Rating</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}></th>
                <th style={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {Cartdata.map((item, i) => (
                <tr
                  key={i}
                  style={
                    i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }
                >
                  <td style={styles.tableCell}>{item.productName}</td>
                  <td style={styles.tableCell}>{item.productDescription}</td>
                  <td style={styles.tableCell}>{item.productQuantity}</td>
                  <td style={styles.tableCell}>{item.productRating}</td>
                  <td style={styles.tableCell}>{item.productPrice}</td>

                  <td style={styles.tableCell}>
                    <button
                      onClick={() => DeleteFromCard(item.id)}
                      style={styles.DeleteFromCard}
                    >
                      DeleteproductFromCart
                    </button>
                  </td>
                </tr>
              ))}
              <td style={styles.tableCell}>
                <button
                  onClick={() => ProductInvoice()}
                  style={styles.ProductInvoice}
                >
                  CreateInvoice
                </button>
              </td>
            </tbody>
          </table>
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
  ProductInvoice: {
    padding: "6px 12px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  DeleteFromCard: {
    padding: "6px 12px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Cart;