import {useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props){
    const { Component } =props;
   
    const navigate =useNavigate();
    useEffect(()=>{
        let token=sessionStorage.getItem('token');
        if(!token){
            navigate('/');
        }
    })
  
    return (
        <>
        <Component/>
        </>
    )
}
export default Protected;