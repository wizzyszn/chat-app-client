import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { TextField } from '@mui/material'
import InputAdornments from '../components/MUI/InputFields'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Spinner from '../components/svg/Spinner'
export default function Login () {
  const navigate = useNavigate();
  const { setLoginInfo, loginUser ,isLoginLoading} = useContext(AuthContext);
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const check = await loginUser();
    if(check){
      setLoginInfo( {
        email : "",
        password : ''
      }
    )
    toast.success("Login successful! Redirecting to chat...");
    setTimeout(() =>{
      navigate('/chat')
    }, 3000);
    }
   
  }

  return (
    <div className=' h-svh'>
      <div className=' w-full h-full grid grid-cols-2'>
        <div className=' bg-image'></div>
        <div className=' vectors'>
          <form className='h-full p-[30%] pt-[15%] flex flex-col gap-6'
          onSubmit={(e) =>{
            handleSubmit(e)
          }}
          >
            <div className=' text-black flex flex-col gap-5'>
              <h1 className=' text-4xl font-semibold'>Welcome Back!</h1>
              <p className=''>
                Log in to your account to continue enjoying our exclusive
                features, stay connected with friends, and access personalized
                promotions.
              </p>
            </div>
            <TextField
            onChange={(e) =>{
              setLoginInfo((prevInfo) =>{
                return {
                  ...prevInfo,
                  email : e.target.value
                }
              })
            }}
              id='outlined-basic'
              label='Email'
              variant='outlined'
              sx={{
                width: '100%'
              }}
            />
              <InputAdornments handleChange = {(password) =>{
                  setLoginInfo(prevInfo =>{
                    return {
                      ...prevInfo,
                      password : password
                    }
                  })
                }} />
            <button type='submit' className={`${isLoginLoading ? ' bg-[#4e4e4e] cursor-not-allowed' : "bg-black"} p-3 rounded-md relative`}>
              {isLoginLoading ? "logging...." : "login"} {isLoginLoading && <Spinner />}
            </button>
            <div className=' flex flex-col gap-2'>
            <p className=' text-sm text-red-500 font-semibold cursor-pointer'
            onClick={() =>{
              navigate('/password-reset')
            }}
            >forgot password?</p>
            <p className=' text-[#333333] text-sm'> <Link to='/register' className=' underline font-semibold text-blue-500'>Don't have an account yet?</Link> Don't have an account yet? Sign up now to join our community!</p>
            </div>
           
          </form>
          <ToastContainer
autoClose={3000}


/>

        </div>
      </div>
    </div>
  )
}
