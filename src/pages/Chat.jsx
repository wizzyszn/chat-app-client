import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'
import SelectChat from '../components/SelectChat'
import ChatSection from '../components/ChatSection'
import ChatProfile from '../components/ChatProfile'
import BasicModal from '../components/MUI/AddChatModal'
import NestedModal from '../components/MUI/ChatModal'

export default function Chat() {
  return (
    <div className='h-svh min-w-full bg-gradient-to-br from-outerBg1 to-outerBg2 p-9 max-sm:p-0'>
        <div className=' bg-innerBg h-[100%] grid grid-cols-12 gap-2 rounded-xl max-sm:rounded-none max-sm:gap-0'>
        <SideBar />
        <div className=' p-4 max-sm:p-1 col-start-2 max-sm:col-start-3 col-end-13 grid grid-cols-8  grid-rows-9 gap-3 overflow-hidden max-sm:grid-cols-2 '>
        <Navbar />
            <SelectChat />
            <ChatSection />
            <ChatProfile />
            <BasicModal />
            <NestedModal />
        </div>
        </div>
    </div>
  )
}
