import React, { useContext } from 'react';
import { useFetchRecipientUser } from '../hooks/useFecthRecipient';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { MdBlock } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import MessageLoader from './svg/MessageLoader';

export default function ChatProfile() {
  const { user } = useContext(AuthContext);
  const { currentChat, toggleRecipientProfile } = useContext(ChatContext);
  const { recipientUser, loading } = useFetchRecipientUser(currentChat, user?._id);

  if (!toggleRecipientProfile) {
    return null; // Return null if toggleRecipientProfile is false
  }

  return (
    <div className='w-full h-full bg-componentColor col-start-7 col-end-9 row-start-2 row-end-10 p-8'>
      {loading ? (<div className='h-full justify-center flex items-center'>
        <MessageLoader />
      </div>
      
      ) : (
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='size-24 rounded-full overflow-auto'>
            <img src={recipientUser?.avatar} alt="avi" className='rounded-full w-full h-full object-cover' />
          </div>
          <h2 className='text-2xl'>{recipientUser?.username}</h2>
          <div className='flex flex-col items-center'>
            <h4 className='font-medium'>Email</h4>
            <p className='text-sm text-gray-500'>{recipientUser?.email}</p>
          </div>
          <div className='flex flex-col items-center'>
            <h4 className='font-medium'>About</h4>
            <p className='text-sm text-gray-500'>I love God</p>
          </div>
          <div className='border-t w-full flex gap-3 justify-between p-4 mt-8 border-gray-500'>
            <div className='flex gap-2 items-center bg-red-600 p-2 rounded-md '>
              <div><MdBlock size={25} /></div>
              <button className='font-semibold'>Block</button>
            </div>
            <div className='flex gap-2 items-center p-2'>
              <div>
                <MdReportProblem size={25} />
              </div>
              <button className='font-medium text-gray-300'>Report Contact</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
