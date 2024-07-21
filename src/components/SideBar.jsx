import React, { useContext, useState } from 'react'
import { LuMessagesSquare } from 'react-icons/lu'
import { IoSettingsOutline } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import Logo from '../assets/images/Logo.png'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router'
import MessageLoader from './svg/MessageLoader'
import { ChatContext } from '../context/ChatContext'
export default function SideBar () {
  const {
    logoutUser,
    isLogoutLoading,
    logoutError,
    setIsLogoutLoading,
    logoutMessage
  } = useContext(AuthContext)
  const { disConnectUser } = useContext(ChatContext);
  const [active,setActive] = useState(0)
  const navigate = useNavigate()
  const sidebar = [
    {
      name: 'DMs',
      linl: '/',
      icon: <LuMessagesSquare size={25} />,
      id: 0
    },
    {
      name: 'Settings',
      linl: '/',
      icon: <IoSettingsOutline size={25} />,
      id: 1
    },
    {
      name: 'Logout',
      link: '/',
      icon: <FiLogOut size={25} />,
      id: 2,
      logoutFunc: () => {
        if (logoutUser()) {
          toast.success(logoutMessage)
          disConnectUser()
          setTimeout(() => {
            setIsLogoutLoading(false)
            navigate('/login')
          }, 3000)
        } else {
          toast.error(logoutError)
        }
      }
    }
  ]
  return (
    <div className=' bg-componentColor col-span-1 row-span-full flex flex-col gap-9 text-normal font-semibold items-center max-sm:col-span-2'>
      <div className=' flex justify-center items-center flex-col gap-1 p-2'>
        <img src={Logo} alt='logo' />
        <h1 className=' text-sm max-sm:hidden'> Chat Buddy</h1>
      </div>
      <div className=' w-full h-[50%] flex gap-3 flex-col'>
        {sidebar.map((barItem, index) => (
          <div
            onClick={() =>{
              setActive(index)
              barItem.logoutFunc && barItem.logoutFunc()  
            }}
            key={index}
            className={` flex flex-col items-center  h-fit p-2 cursor-pointer`}
          >
            <div className={` p-2 ${index ===active?"bg-[#003366] " :""}  hover:bg-[#003366]  rounded-md`}>
              {barItem.icon}
            </div>

            <span className=' text-xs max-sm:hidden'>{barItem.name}</span>
          </div>
        ))}

        {isLogoutLoading && (
          <div className=' flex justify-center items-center'>
            <MessageLoader />
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
