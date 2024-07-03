import React from 'react'
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'
import SelectChat from '../components/SelectChat'
import ChatSection from '../components/ChatSection'
import ChatProfile from '../components/ChatProfile'
import BasicModal from '../components/MUI/AddChatModal'

export default function Chat() {
  return (
    <div className='h-svh min-w-full bg-gradient-to-br from-outerBg1 to-outerBg2 p-9'>
        <div className=' bg-innerBg h-[100%] grid grid-cols-12 gap-2 rounded-xl'>
        <SideBar />
        <div className=' p-4 col-start-2 col-end-13 grid grid-cols-8 g grid-rows-9 gap-3 overflow-hidden'>
        <Navbar />
            <SelectChat />
            <ChatSection />
            <ChatProfile />
            <BasicModal />
        </div>
            
        </div>
    </div>
  )
}
