import React, { useContext, useEffect } from 'react'
import { useFetchRecipientUser} from '../hooks/useFecthRecipient'
import noImage from '../assets/images/pngegg (6).png'
import { ChatContext } from '../context/ChatContext';
import useFetchLatestMessage from '../hooks/useFetchLatestMessage';
import {unreadNotificationsFunc} from '../utils/unreadNotifications'

function UserChat({chat,user}) {
  const {onlineUsers,notifications,
    markThisNotificationAsRead} = useContext(ChatContext);
    const  {recipientUser} = useFetchRecipientUser(chat, user?._id);
    const latestMessage = useFetchLatestMessage(chat)
    useEffect(() => {
      console.log("notifications in user chat :", notifications);
      console.log("recipient in user chat :", recipientUser?._id);
      console.log("Unread notifications:", unreadNotifications);
      console.log("This user notifications:", thisUserNotifications);
    }, [notifications, recipientUser]);
  
    const recipientId = chat?.members.find(member => member !== user?._id);
    const isUserOnline = onlineUsers.some(user =>{
      return user.userId === recipientId
    });
    const lastMessage = latestMessage?.text
    let message;
    const subString = (text) =>{
      if(text?.length > 20){
        message = text?.substring(0,20) + "......."
        return message
      }else{
        return text;
      }
    }

    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(notification =>{ 
      console.log("notification in array:",notification)  
      console.log("id in array:",recipientUser?._id)  
      return notification?.senderId === recipientUser?._id
    })

  return (
    <div className=' hover:bg-[#2F83E4] hover:text-black cursor-pointer w-full bg-componentColor h-20  p-6 mb-1 flex items-center' onClick={() =>{
        markThisNotificationAsRead(thisUserNotifications,notifications);
     
    
   


    }}>
    <div className=' flex gap-5 w-full items-center'>
      <div className=' size-14 relative rounded-full'>
        <img
          className=' rounded-full w-full h-full object-cover border-[3px] border-[#2F83E4]'
          src={recipientUser?.isAvatarImageSet?recipientUser?.avatar : noImage}
          alt='avi'
        />
        
        <div className={` size-3 rounded-full absolute top-2 right-0 ${isUserOnline ? "bg-green-500" : " bg-gray-4y00"} `}></div>
        
        
      </div>{' '}
      <div className=''>
      <h4 className=' text-[1rem] font-medium'>{recipientUser?.firstName +" "+ recipientUser?.lastName}</h4>
      <span className=' text-[0.75rem] text-[#CBCBCB]'>{subString(lastMessage)}</span>
      </div>  
      {
        thisUserNotifications.length  > 0 && (<div className=' absolute right-6 size-5 rounded-full bg-green-500 text-center text-black font-medium text-sm'>
          {thisUserNotifications.length}
        </div>
  )
      }
          </div>
  </div>

  )
}
export default React.memo(UserChat);
