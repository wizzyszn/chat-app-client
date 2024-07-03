import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { baseUrl, postRequest } from '../utils/services';
import Spinner from '../components/svg/Spinner';

  
export default function ConfirmReset() {
   const params =  useParams();
   const id = params.id;
   const navigate = useNavigate();
  const [passwordDetails,setPasswordDetails] = useState({
    "confirmPassword" : "",
    "password" : "",

  });
  const [errorMessage,setErrorMessage] = useState(null);
  const [message,setMessage] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      setIsLoading(true)
      const response = await postRequest(`${baseUrl}/users/confirm-reset` , JSON.stringify({newPassword:passwordDetails.confirmPassword , token : id}));
      if(response.error){
        setErrorMessage(response?.message);
        setIsLoading(false);
        setMessage(null);
        throw new Error(response.message)
      }
      setMessage(response.message);
      setIsLoading(false);
      setErrorMessage(null);
      setTimeout(() =>{
        navigate('/login')
      }, 2000)
     
  
    }catch(err){
      setErrorMessage(err.message)
    }
    }
    console.log("passwordDetails", passwordDetails)
  return (
    <div className=' h-svh flex items-center justify-center text-black flex-col p-[5%] border-2'>
             {
            errorMessage && (<div className=' p-3 text-red-400 text-center'>{errorMessage}</div>)
          }{ 
            message && (<div className=' p-3 text-green-400 text-center'>{message}</div>)
}
     
      <div className=' flex flex-col gap-4 shadow-md border w-[30%] h-[50%] p-6 shad relative'>
        <h1 className=' text-3xl font-semibold'>Set new password</h1>
        <form className=' flex flex-col mt-4 gap-5' onSubmit={(e) =>{
          handleSubmit(e)
        }}>
          <TextField
          onChange={(e) =>{setPasswordDetails((prevInfo) =>{
            return {
              ...prevInfo,
              password : e.target.value
            }
          })}}
            id='outlined-basic'
            label='Password'
            variant='outlined'
            sx={{
              width: '100%'
            }}
          />
          <TextField
          onChange={(e) =>{
            setPasswordDetails((prevInfo) =>{
              return {
                ...prevInfo,
                confirmPassword : e.target.value
              }
            })
          }}
            id='outlined-basic'
            label='Confirm password'
            variant='outlined'
            sx={{
              width: '100%'
            }}
          />
          <p className=' text-sm'>We’ll send a verification link to this email or phone number if it matches an existing account.</p>
          <button className={`${isLoading ? " bg-[#4e4e4e] rounded-2xl text-white p-4 ": "bg-black rounded-2xl text-white p-4 "} relative `}>Next{isLoading && <Spinner />}</button> 
      </form>
      </div>
    </div>
  )
}
