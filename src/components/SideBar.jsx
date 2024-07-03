import React, { useContext } from 'react'
import { LuMessagesSquare } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import MessageLoader from './svg/MessageLoader';
import { ChatContext } from '../context/ChatContext';
export default function SideBar () {
  const {logoutUser, isLogoutLoading,
    logoutError, setIsLogoutLoading,
    logoutMessage} = useContext(AuthContext);
    const { disConnectUser} = useContext(ChatContext)
    const navigate = useNavigate()
  return (
    <div className=' bg-componentColor col-span-1 row-span-full flex flex-col gap-9 text-normal font-semibold items-center'>
      <div>
        <h1 className=' text-4xl p-3'> Logo</h1>
      </div>
      <div className=' w-full h-[50%] flex gap-3 flex-col'>
        <div className=' flex flex-col items-center  h-fit p-2 cursor-pointer '>
          <div className=' p-2  hover:bg-[#003366]  rounded-md'>
          <LuMessagesSquare size={25} />
          </div>
          
          <span className=' text-xs'>DMs</span>
        </div>
        <div className=' flex flex-col items-center  h-fit p-2 cursor-pointer '>
          <div className=' p-2  hover:bg-[#003366]  rounded-md'>
          <IoSettingsOutline size={25} />
          </div>
          
          <span className=' text-xs'>Settings</span>
        </div>
        <div className=' flex flex-col items-center  h-fit p-2 cursor-pointer '
        onClick={() =>{
          if(logoutUser()){
            toast.success(logoutMessage);
            disConnectUser()
            setTimeout(()=>{
              setIsLogoutLoading(false)
              navigate('/login')
          },3000)
          }else{
            toast.error(logoutError)
          }
        }}
        >
          <div className=' p-2  hover:bg-[#003366]  rounded-md'>
          <FiLogOut size={25} />
          </div>
          
          <span className=' text-xs'>Logout</span>
        </div>    {
          isLogoutLoading &&( <div className=' flex justify-center items-center'><MessageLoader /></div>)
        } 
       
         </div>
         
      <ToastContainer />
    </div>
  )
}
