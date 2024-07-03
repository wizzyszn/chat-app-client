import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { TextField } from '@mui/material'
import InputAdornments from '../components/MUI/InputFields'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/svg/Spinner'

export default function Register () {
  const { setRegisterInfo, registerUser, isRegisterLoading } =
    useContext(AuthContext)
  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()
    const check = await registerUser()
    if (check) {
      setRegisterInfo({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      })
      toast.success('Registration successful! Redirecting to login...')
      setTimeout(() => {
        navigate('/setAvi')
      }, 2000)
    }
  }
  return (
    <div className=' h-svh'>
      <div className=' w-full h-full grid grid-cols-2'>
        <div className=' bg-image'></div>
        <div className=' vectors'>
          <form
            className='h-full p-[30%] pt-[4%] flex flex-col gap-4'
            onSubmit={e => {
              handleSubmit(e)
            }}
          >
            <div className=' text-black flex flex-col gap-2 '>
              <h1 className=' text-4xl font-semibold'>Join Our Community!</h1>
              <p className=''>
                Become a member and unlock exclusive features and a personalized
                chat experience. Sign up now to connect with friends and enjoy a
                range of member-only benefits!
              </p>
            </div>
            <TextField
              id='outlined-basic'
              label='First Name'
              variant='outlined'
              sx={{
                width: '100%'
              }}
              onChange={e => {
                setRegisterInfo(prevInfo => {
                  return {
                    ...prevInfo,
                    firstName: e.target.value
                  }
                })
              }}
            />

            <TextField
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
              sx={{
                width: '100%'
              }}
              onChange={e => {
                setRegisterInfo(prevInfo => {
                  return {
                    ...prevInfo,
                    lastName: e.target.value
                  }
                })
              }}
            />
            <TextField
              id='outlined-basic'
              label='Username'
              variant='outlined'
              sx={{
                width: '100%'
              }}
              onChange={e => {
                setRegisterInfo(prevInfo => {
                  return {
                    ...prevInfo,
                    username: e.target.value
                  }
                })
              }}
            />
            <TextField
              id='outlined-basic'
              label='Email'
              type='email'
              variant='outlined'
              sx={{
                width: '100%'
              }}
              onChange={e => {
                setRegisterInfo(prevInfo => {
                  return {
                    ...prevInfo,
                    email: e.target.value
                  }
                })
              }}
            />
            <InputAdornments
              handleChange={password => {
                setRegisterInfo(prevInfo => {
                  return {
                    ...prevInfo,
                    password: password
                  }
                })
              }}
            />
            <button
              type='submit'
              className={`${
                isRegisterLoading
                  ? ' bg-[#4e4e4e] cursor-not-allowed'
                  : 'bg-black'
              } p-3 rounded-md relative`}
            >
              {isRegisterLoading ? 'registering....' : 'register'}
              {isRegisterLoading &&    <Spinner />}
            
            </button>
            <p className=' text-[#333333] text-sm'>
              {' '}
              <Link
                to='/login'
                className=' underline font-semibold text-blue-500'
              >
                Already have an account?
              </Link>{' '}
              Sign up now to join our community!
            </p>
          </form>
          <ToastContainer autoClose={3000} />
        </div>
      </div>
    </div>
  )
}
