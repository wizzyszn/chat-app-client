import React, { useContext } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AuthContext } from '../context/AuthContext'
import noImage from '../assets/images/pngegg (6).png'
import { ChatContext } from '../context/ChatContext'
export default function Navbar () {
  const { user } = useContext(AuthContext)
  const { setOpenModal,onlineUsers } = useContext(ChatContext);
  const isUserOnline = onlineUsers.some(users =>{
    return users.userId === user?._id
  })

  return (
    <div className=' bg-inherit col-span-full flex justify-between items-center'>
      <h1 className=' text-4xl font-semibold'>Chat</h1>
      <div className=' flex gap-4 items-center'>
        <div
          className=' flex gap-1 items-center bg-[#2F83E4] py-1 px-9 rounded-lg justify-center text-black cursor-pointer'
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <IoMdAdd size={20} />
          <span>Chat</span>
        </div>
        <IoMdNotificationsOutline size={30} />
        <div className=' flex items-center gap-3'>
          <div className=' relative size-10 rounded-full'>
            {' '}
            <img
              src={user.isAvatarImageSet ? user?.avatar : noImage}
              alt=''
              className=' w-full h-full object-cover rounded-full border-[3px] border-[#2F83E4]'
            />
             
             <div className={` size-3 rounded-full absolute top-1 right-0 ${isUserOnline ? "bg-green-500": " bg-gray-400"} `}></div>
        
        
          </div>{' '}
          <span className=' font-semibold'>
            {user?.firstName + ' ' + user?.lastName}
          </span>
        </div>
      </div>
    </div>
  )
}
