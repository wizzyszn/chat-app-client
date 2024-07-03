import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { baseUrl, postRequest } from '../utils/services';
import Spinner from '../components/svg/Spinner'
export default function Reset () {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [errorMessage,setErrorMessage] = useState(null);
  const [message,setMessage] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const handleChange  = (e) =>{
    setEmail(e.target.value)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      setIsLoading(true)
      const response = await postRequest(`${baseUrl}/users/password-reset` , JSON.stringify({email : email}));
      if(response.error){
        setIsLoading(false);
        setMessage(null)
        throw new Error(response.message);
      }
      setMessage(response.message);
      setIsLoading(false);
      setErrorMessage(null)
  
    }catch(err){
      setErrorMessage(err.message)
    }
    }
    console.log(email)
  return (
    <div className=' h-svh flex items-center justify-center text-black flex-col p-[5%] border-2'>
       {
            errorMessage && (<div className=' text-sm p-3 text-red-500 text-center'>{errorMessage}</div>)
          }{ 
            message && (<div className='text-sm 00 p-3 text-green-600 text-center'>{message}</div>)
}
      <div className=' flex flex-col gap-4 shadow-lg border w-[30%] h-[50%] p-6 relative'>
        <h1 className=' text-2xl font-medium'>Forgot password</h1>
        <form className=' flex flex-col mt-4 gap-5' onSubmit={(e) =>{
          handleSubmit(e)
        }}>
          <TextField
          onChange={(e) =>{handleChange(e)}}
            id='outlined-basic'
            label='Email'
            variant='outlined'
            sx={{
              width: '100%'
            }}
          />
          <p className=' text-sm'>We’ll send a verification link to this email or phone number if it matches an existing account.</p>
          <button className={`${isLoading ? " bg-[#4e4e4e] rounded-2xl text-white p-4  ": "bg-black rounded-2xl text-white p-4 "} relative`}>Next  {isLoading &&<Spinner />  }  </button>
          <button onClick={() =>{
            navigate('/login')
          }} className=' text-black text-sm font-medium hover:underline'>Return to sign in</button>
         
        </form>
       
      </div>
    </div>
  )
}
