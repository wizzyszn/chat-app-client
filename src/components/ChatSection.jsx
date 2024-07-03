import React, { useContext, useEffect, useRef, useState } from 'react'
import { SlOptionsVertical, SlPaperClip } from 'react-icons/sl'
import { ChatContext } from '../context/ChatContext'
import { useFetchRecipientUser } from '../hooks/useFecthRecipient'
import { AuthContext } from '../context/AuthContext'
import MessageLoader from '../components/svg/MessageLoader'
import { IoIosSend } from "react-icons/io";
import bgVector from '../assets/images/85.png'
import moment from 'moment';
import InputEmoji from "react-input-emoji"
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import ContextMenu from './ContextMenu';
import { MdOutlineStar, MdOutlineContentCopy } from 'react-icons/md';
import { RiDeleteBinLine } from "react-icons/ri";

export default function ChatSection () {
  const { user } = useContext(AuthContext);
  const [menuPosition, setMenuPosition] = useState(null); // State for menu position
  const [selectedMessage, setSelectedMessage] = useState(null); // State for selected message
  const [multipleSelect, SetMultipleSelect] = useState(false); // State for multiple select
  const [highlightSelect, SetHighlightSelect] = useState([]); // State for highlighted message
  const { messages, isMessagesLoading, currentChat,setTextMessage,textMessage,sendTextMessage,clearChat,clearedChats,toggleRecipientProfile,
    setToggleRecipientProfile,deleteMultipleMessages,setMessages, handleTyping,isTyping} = useContext(ChatContext);
    
  const { recipientUser } = useFetchRecipientUser(currentChat, user?._id);
  const contextMenuRef = useRef(null);
  const msgContainerRef = useRef(null);
 
  useEffect(() =>{
    const handleClickOutside = (e) =>{
      console.log("event: ", e);
      console.log("reference: ", contextMenuRef.current);
      if(contextMenuRef.current && !contextMenuRef.current.contains(e.target)){
        closeMenu();
      }
    }
    window.addEventListener('mousedown', (e) =>{
      handleClickOutside(e)
    })
    return () =>{window.removeEventListener('mousedown', handleClickOutside)}
  },[])
  useEffect(() =>{
msgContainerRef.current?.scrollIntoView({behavior : 'smooth'})
}, [messages])
  //functions
  const handlePress = (e) =>{
    if(e.key === "Enter"){
      e.preventDefault()
      sendTextMessage(user._id,currentChat?._id)
    }
  }
  const handleRightClick = (e, message) => {
    e.preventDefault();
    setSelectedMessage(message);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const closeMenu = () => {
    setMenuPosition(null);
    setSelectedMessage(null);
  };

  const pinMessage = () => {
    console.log('Pin Message:', selectedMessage);
    closeMenu();
  };

  const starMessage = () => {
    console.log('Star Message:', selectedMessage);
    closeMenu();
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(selectedMessage.text);
    console.log('Copied:', selectedMessage.text);
    closeMenu();
  };

  const shareMessage = () => {
    console.log('Share Message:', selectedMessage);
    closeMenu();
  };
  const handleOnDbClick = () => {
      SetMultipleSelect(!multipleSelect);
      if(multipleSelect){
        SetHighlightSelect([]);
      }
  }
  const handleClick = (message)=>{
    if(multipleSelect){
      highlightSelect.includes(message?._id) ? 
       SetHighlightSelect((prevMsg) =>{
       const filtered =  highlightSelect.filter((elem) =>{
        return elem !== message?._id
       })
       return filtered
      }) : SetHighlightSelect((prevMsg) =>([...prevMsg,message?._id]))
    }
    
  }
  const handleDelete = () =>{
    deleteMultipleMessages(highlightSelect);
    SetHighlightSelect([]);
    SetMultipleSelect(false);
    setMessages(prevMsg =>{
      const filtered = prevMsg.filter(msg => !highlightSelect.includes(msg?._id));
      return filtered;
    })
  }
  const selectAllHighlights = () =>{
    SetHighlightSelect(() =>(highlightSelect.length === messages.length ? [] : messages.map(msg => msg._id)))
  }
  //debud area
  console.log("getTypingStatus", isTyping)
  if (currentChat === null) {
    return <div>Start a conversation </div>
  }
  //set state of cleared chat
  const isChatCleared = clearedChats[currentChat?._id];
  console.log("message container :", msgContainerRef)
  return (
    <div className=" bg-inherit col-span-4 row-start-2 row-end-10 flex flex-col">
      <div className=" rounded-xl h-[15%] bg-componentColor flex items-center justify-between p-4 relative">
       {
        multipleSelect ? <div className=' flex justify-between border w-full p-4 items-center'>
          <div className=' flex gap-3 items-center'>
          <div>{highlightSelect.length < 1 ? "0 " :highlightSelect.length + " "}selected</div>
            <button 
            onClick={() =>{selectAllHighlights()}}
            className='p-2 bg-[#003366] rounded-sm'>{highlightSelect.length === messages.length ? "unselect all" : "select all"}</button>
          </div>
        
          <div className=' flex w-1/2 gap-4 justify-end items-center'>
            <div className=' flex items-center gap-1 cursor-pointer'><MdOutlineStar /><span>star</span> </div>
            <div className=' flex items-center gap-1 cursor-pointer'><MdOutlineContentCopy /><span>copy</span></div>
            <div 
            onClick={() =>{
              handleDelete()
            }}
            className=' flex items-center gap-1 hover:bg-red-600 p-2 rounded-sm cursor-pointer'><RiDeleteBinLine /><span>delete</span></div>
            <button
            className='p-2 bg-[#003366] rounded-sm'
            onClick={() =>{
              SetHighlightSelect([]);
              SetMultipleSelect(false)
            }}
            >cancel</button>
          </div>

        </div> :(
          <>
           <div className=" flex items-center gap-5 ">
          <div className=" size-14 relative rounded-full border border-black">
            {recipientUser && (
              <img
                className=" rounded-full w-full h-full object-cover border-[3px] border-[#2F83E4]"
                src={recipientUser?.avatar}
                alt="avi"
              />
            )}
          </div>
          {recipientUser && <h3>{recipientUser?.firstName}</h3>}
        </div>
        {
          isTyping && <div className=' border text-center'>typing.....</div>
        }
        <div className=" show-menu relative">
          <SlOptionsVertical size={25} />
          <div className="h-[150px] z-40 bg-componentColor shadow-2xl border border-gray-500 rounded-md w-[150px] absolute right-6 menu  p-4">
            <div
              className=" flex flex-col justify-center items-center gap-1"
              onClick={() => {
                setToggleRecipientProfile(!toggleRecipientProfile);
              }}
            >
              <CgProfile size={25} />
              <button>View proifle</button>
            </div>
            <div className="flex justify-center items-center gap-3 clear-chat ">
              <button className=" bg-[#2F83E4] rounded-sm">clear chat</button>
              <div
                className="p-2 delete rounded-sm"
                onClick={() => {
                  clearChat(currentChat);
                }}
              >
                <RiDeleteBin6Line size={25} />
              </div>
            </div>
          </div>
        </div></>
        )
       }
      </div>
      <div className="mt-5 bg-componentColor p-4 h-full relative flex flex-col overflow-y-auto gap-8  "
      ref={msgContainerRef}
       >
        {isMessagesLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <MessageLoader />
          </div>
        ) : (messages.length < 1 || isChatCleared) && recipientUser ? (
          <div className=" flex flex-col items-center">
            <div>
              {" "}
              <img src={bgVector} alt="" />
            </div>
            <h3 className=" text-xl">
              {" "}
              start a conversation with {recipientUser?.firstName}
            </h3>
          </div>
        ) : (
          !isChatCleared &&
          messages.map((message, index) => {
            return (
              <div
               
                onDoubleClick={handleOnDbClick}
                onContextMenu={(e) => handleRightClick(e, message)}
                onClick={()=>{
                  handleClick(message)
                }}
                key={index}
                id={message?._id}
                style={{
                  background : highlightSelect.includes(message._id) &&  '#003366'
                }}
                className={`${
                  message.senderId === user?._id
                    ? "justify-end  p-4 flex gap-3 w-full text-sm relative rounded-md"
                    : "justify-start p-4 gap-3 flex w-full text-sm relative rounded-md"
                } `}
              >
                {multipleSelect && (
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    readOnly
                    checked ={highlightSelect.includes(message?._id)}
                    className="absolute mr-9 top-[45%] left-0"
                  />
                )}

                {message.senderId !== user?._id && (
                  <div className=" relative size-10 rounded-full flex-shrink-0">
                    {" "}
                    <img
                      src={recipientUser?.avatar}
                      alt=""
                      className=" w-full h-full object-cover rounded-full border-[3px] border-[#2F83E4]"
                    />{" "}
                  </div>
                )}
                <div className=" relative">
                  <div
                    className={`${
                      message.senderId === user?._id
                        ? "self-end border-2 p-4 border-[#2F83E4]  rounded-xl flex"
                        : "bg-[#002047] self-start border-2 p-4  border-[#2F83E4] rounded-xl flex"
                    } `}
                  >
                    {message?.text}
                  </div>
                  <span
                    className={`text-[0.7rem] absolute ${
                      message.senderId === user?._id
                        ? "bottom-[-20px] right-0"
                        : "bottom-[-20px] left-0"
                    } `}
                  >
                    {moment(message.createdAt).format("hh:mm A")}
                  </span>
                </div>

                {message.senderId === user?._id && (
                  <div className=" relative size-10 rounded-full flex-shrink-0">
                    {" "}
                    <img
                      src={user?.avatar}
                      alt=""
                      className=" w-full h-full object-cover rounded-full border-[3px] border-[#2F83E4]"
                    />{" "}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="h-[10%]   border-2 text-white bg-componentColor border-blue-500 flex items-center gap-2">
        <InputEmoji
          value={textMessage}
          onChange={(e) => {
            handleTyping();
            setTextMessage(e);
          }}
          onKeyDown={(e) => {
            handlePress(e);
          }}
          cleanOnEnter
          onEnter={handlePress}
          placeholder="Type a message"
        />
        <div className=" flex gap-2 items-center mr-4">
          <SlPaperClip size={25} />
          <div className=" bg-blue-500 p-2 hover:cursor-pointer">
            <IoIosSend
              size={20}
              onClick={() => {
                sendTextMessage(user._id, currentChat?._id);
              }}
            />
          </div>
        </div>
      </div>
      {menuPosition && (
        <ContextMenu
          ref={contextMenuRef}
          position={menuPosition}
          closeMenu={closeMenu}
          pinMessage={pinMessage}
          starMessage={starMessage}
          copyMessage={copyMessage}
          shareMessage={shareMessage}
        />
      )}
    </div>
  );
}
