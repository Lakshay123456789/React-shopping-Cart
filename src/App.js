import Login from './Accounts/Login';
import Product from './AdminProduct/Product'
import {Routes,Route,Navigate} from 'react-router-dom'
import './App.css';
import AddProduct from './AdminProduct/AddProduct';
import EditProduct from './AdminProduct/EditProduct';
import Protected from './AdminProduct/Protected';
import NavBar  from './AdminProduct/NavBar';
import Logout from './Accounts/Logout';
import User from './UserProduct/User';
import Cart from './UserProduct/Cart'
import SignUp from './UserProduct/SignUp';
import Invoice from './UserProduct/Invoice';
import CreateInvoice from './UserProduct/CreateInvoice';
import Allinvoice from './AdminProduct/Allinovice';
import ForgetPassword from './Accounts/ForgetPassword';
function App() {
  const roles={
    user:"user",
    admin:"admin"
  }
   const role=sessionStorage.getItem('role');
  return (
    <div className="">
   
      <Routes>
      <Route path='/' element={<Login/>}> </Route>
          <Route path='/Product' element={<Protected Component={Product} role={role ===roles.admin} ></Protected>}></Route>
          <Route path='/AddProduct' element={<Protected Component={AddProduct}></Protected>}></Route>
          <Route path='/EditProduct' element={<Protected Component={EditProduct}></Protected>}></Route>
          <Route path='/NavBar' element={<Protected Component={NavBar}></Protected>}> </Route>
          <Route path='/Logout' element={<Protected Component={Logout}></Protected>}></Route>
          <Route path='/User' element={<Protected Component={User}></Protected>}></Route>
          <Route path='/Invoice' element={<Protected Component={Invoice}></Protected>}></Route>
          <Route path='/Cart' element={<Protected Component ={Cart}></Protected>}></Route>
          <Route path='/CreateInvoice' element={<Protected Component ={CreateInvoice}></Protected>}></Route>
          <Route path='/Allinovice' element={<Protected Component ={Allinvoice}></Protected>}></Route>
          <Route path='/ForgetPassword' element={<ForgetPassword></ForgetPassword>}></Route>
          <Route path='/SignUp' element={<SignUp></SignUp>}></Route>
        <Route path='*' element={<Navigate to='/'></Navigate>}></Route>
      </Routes>    
    </div>
  );
}

export default App;
