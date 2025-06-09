import React, { useEffect } from 'react';
import {api} from '../../config/api';
import { useNavigate } from 'react-router-dom';

export default function LoginRedirect() {
    
    const navigate = useNavigate();
    const redirectLoginGov = async (url)  => {
        try {
          const res = await api.loginRedirect(`/auth/loginRedirect${url}`);
      
          if (!res.data) {
            throw new Error(404, 'Service not found', 'SERIOUS');
          }
      
          const response = res.data;
      
          if (response.success !== 1) {
            throw new Error(response.success, response.message);
          }
      
          const cookie = response.result;
          const tomorrow = new Date(Date.now() + 86400000);
          
          localStorage.setItem('MM-SSID', cookie);
          localStorage.setItem('expires-at', tomorrow.toString());
          navigate("/user");
          return true;
        } catch (err) {
          const code = err.code || -99;
      
          switch (code) {
            case -1:
              alert('User does not exist');
              break;
            case -2:
              alert('Password does not match');
              break;
            default:
              alert('System error');
              break;
          }
      
          console.error(err);
          return false;
        }
      };
      

      useEffect(()=>{
        const url = window.location.href;
        const splittedUrl = url.split("#");

        redirectLoginGov("?" + splittedUrl[1])
      }, [])
      

}