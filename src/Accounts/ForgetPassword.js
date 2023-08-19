import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Send email to get reset token
    const handleSubmit = (e)=>{
        e.preventDefault();
    axios.post('https://localhost:7165/api/Account/ForgetPassword',
        { email }
    ).then((resp)=>{
           setMessage(resp.data);
    }).catch((er)=>{

    })
      setShowModal(true);
    }
    useEffect(() => {
        if (token && newPassword && confirmPassword) {
            const forget = {
                "Password": `${newPassword}`,
                "ConfirmPassword": `${confirmPassword}`,
                "Email": `${email}`,
                "Token": `${token}`
            };

            axios.post("https://localhost:7165/api/Account/ResetPassword", forget)
                .then((resp) => {
                   
                })
                .catch((er) => {
                   
                });
            
            setShowModal(false);
            setEmail('');
        }
    }, [token, newPassword, confirmPassword, email]);
    
// Verify email to get token
const VerifyEmail =  () => { 
    debugger
    axios.get(`https://localhost:7165/api/Account/GetEmailToken?Email=${email}`).then((resp)=>{
       setToken(resp.data.token);
   }).catch((er)=>{
      console.log(er.data);
   })
};

const handleCloseModal = () => {
        
 if( newPassword !== confirmPassword){
     setMessage("setNewPassword is not match with the Confirm Password");

 }else if(newPassword=== '' || confirmPassword === ''){
    setMessage("setNewPassword and  Confirm Password was not correct formet ");
 }else{
 VerifyEmail();
 }
};
    return (
        <>
        <div className="container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control w-25"

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Reset Password
                </button>
            </form>
            <div className="message">{message}</div>

   
        </div>
                 {/* Modal */}
                 <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Reset Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter New Password"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm New Password"
                    />
                      <div className="message">{message}</div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                            Save 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default ForgetPassword;