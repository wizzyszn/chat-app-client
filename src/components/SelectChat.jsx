import React, { useContext } from 'react'
import FreeSolo from './SearchBar'
import { AuthContext } from '../context/AuthContext'
import UserChat from './UserChat'
import { ChatContext } from '../context/ChatContext'
import MessageLoader from '../components/svg/MessageLoader'
export default function SelectChat () {
  const { user } = useContext(AuthContext)
  const { userChats, updateCurrentChat , isUserChatsLoading,notifications} = useContext(ChatContext)
  return (
    <div className=' bg-inherit  col-span-2 row-start-2 row-end-10 flex flex-col gap-5 relative'>
      <div className=' flex gap-2 items-center'>
        <h3 className=' font-semibold text-lg'>Inbox</h3>
        <span className=' text-[#2F83E4] bg-[#003474] rounded-2xl px-4 text-sm'>
          {
            notifications.length + " New"
          }
        </span>
      </div>
      <FreeSolo />
      <div className=' w-full h-full bg-inherit rounded-xl overflow-y-auto'>
       {
  isUserChatsLoading ? (
    <div className=' w-full h-full flex items-center justify-center'> 
          <MessageLoader />
    </div>

  ) : userChats.length < 1 ? (
    <div className='h-full flex items-center justify-center'>
      please select a chat
    </div>
  ) : (
    userChats.map((chat, index) => {
      return (
        <div key={index} onClick={() =>{ updateCurrentChat(chat)}}>
        <UserChat
          chat={chat}
          user={user}
        />
        </div>
      )
    })
  )
}

      </div>
    </div>
  )
}
