import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { baseUrl, getRequest, postRequest } from '../utils/services'
import { AuthContext } from './AuthContext'
import io from 'socket.io-client'
export const ChatContext = createContext()
export const ChatContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [userChats, setUserChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [messagesError, setMessagesError] = useState(null)
  const [textMessage, setTextMessage] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [clearedChats, setClearedChats] = useState(() => {
    const storedClearedChats = localStorage.getItem('clearedChats')

    if (!storedClearedChats) {
      return {}
    } else return JSON.parse(storedClearedChats)
  })
  const [allUsers, setAllUsers] = useState([])

  const [toggleRecipientProfile, setToggleRecipientProfile] = useState(false)
  useEffect(() => {
    const newSocket = io('http://localhost:4000')
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [user])
  //fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users/${user?._id}`)
        console.log('users :', response)
        if (response.error) throw new Error(response.message)
        setAllUsers(response)
      } catch (err) {
        console.log(err.message)
      }
    }
    if (user) {
      fetchUsers()
    }
  }, [user])
  //add online users and get online users
  useEffect(() => {
    if (socket === null) {
      return
    }
    socket.emit('addNewUsers', user)
    socket.on('getOnlineUsers', users => {
      setOnlineUsers(users)
      return () => {
        socket.off('getOnlineUsers')
      }
    })
  }, [socket, user])

  //fetch messages
  useEffect(() => {
    async function fetchMessage () {
      try {
        setIsMessagesLoading(true)
        const response = await getRequest(
          `${baseUrl}/messages/${currentChat?._id}`
        )
        if (response.error) {
          setIsMessagesLoading(false)
          throw new Error(response.error)
        }
        setMessages(response)
        setIsMessagesLoading(false)
      } catch (err) {
        console.log(err.message)
        setMessagesError(err.message)
      }
    }
    fetchMessage()
  }, [currentChat])

  //send message through socket
  useEffect(() => {
    if (socket === null) return
    const recipientId = currentChat?.members.find(mem => mem !== user?._id)
    socket.emit('sendMessages', {
      message: newMessage,
      recipient: recipientId
    })
  }, [socket, newMessage, currentChat, user])
  //get messages from sockets
  useEffect(() => {
    if (socket === null) return
    socket.on('getMessage', res => {
      if (currentChat?._id !== res.chatId) return
      setMessages(prev => [...prev, res])
    })
    socket.on('getNotification', res => {
      console.log('response in get notification event:', res)
      const isChatOpen = currentChat?.members.some(mem => mem === res.senderId)
      console.log('isChatOpen', isChatOpen)
      if (isChatOpen) {
        setNotifications(prevNotification => {
          return [...prevNotification, { ...res, isRead: true }]
        })
      } else setNotifications(prevNotification => [...prevNotification, res])
    })
    return () => {
      socket.off('getMessage')
      socket.off('getNotification')
    }
  }, [socket, currentChat]);
  //fetch user chats
  useEffect(() => {
    async function getUsers () {
      try {
        setIsUserChatsLoading(true)
        const response = await getRequest(
          `${baseUrl}/chat/user-chats/${user?._id}`
        )
        if (response.error) {
          setIsUserChatsLoading(false)
          throw new Error(response.error)
        }
        setUserChats(response)
        setIsUserChatsLoading(false)
      } catch (err) {
        console.log(err.message)
      }
    }
    if (user) {
      getUsers()
    }
  }, [user])
  
  //listen for typing event from socket
  useEffect(() => {
    if (socket === null) return
    socket.on('getTpyingStatus', res => {
      setIsTyping(res)
    })
    return () => {
      socket.off('getTpyingStatus')
    }
  }, [socket, isTyping])
  //update local storage whenever clearchat flag changes
  useEffect(() => {
    localStorage.setItem('clearedChats', JSON.stringify(clearedChats))
  }, [clearedChats])

  //functions
  //create chat function
  const creatChat = useCallback(async (userId, recipientId) => {
    try {
      const response = await postRequest(
        `${baseUrl}/chat/create-chat`,
        JSON.stringify({
          firstId: userId,
          secondId: recipientId
        })
      )
      if (response.error) throw new Error(response.message)
      setUserChats(prevChat => {
        return [...prevChat, response]
      })
    } catch (err) {
      console.log(err.message)
    }
  }, [])

  //send text function
  const sendTextMessage = useCallback(
    async (senderId, chatId) => {
      if (textMessage.length === 0)
        return console.log('you must type something')
      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          senderId,
          text: textMessage,
          chatId
        })
      )
      if (response.error) return
      setMessages(prevMessage => {
        return [...prevMessage, response]
      })
      setNewMessage(response)
      setTextMessage('')
    },
    [textMessage]
  )
  const updateCurrentChat = useCallback(chat => {
    setCurrentChat(chat)
  }, [])

  //clear chat function
  const clearChat = useCallback(currentChat => {
    setClearedChats(prevChats => ({ ...prevChats, [currentChat?._id]: true }))
    setMessages([])
  }, [])
  //delete Messages for everyone
  const deleteMultipleMessages = useCallback(async selectedMsg => {
    try {
      const response = await postRequest(
        `${baseUrl}/messages/delete-messages`,
        JSON.stringify({ messages: selectedMsg })
      )
      if (response.error) throw new Error(response.message)
      console.log(response.message)
    } catch (err) {
      console.log('error :', err.message)
    }
  }, [])
  //disconnect function
  const disConnectUser = useCallback(() => {
    if (socket === null) return
    socket.emit('disconnectUser', user)
    socket.disconnect()
  }, [socket, user])
  //handle typing function
  const handleTyping = useCallback(() => {
    let timeout
    const recipientId = currentChat?.members.find(mem => mem !== user?._id)
    if (!isTyping) {
      socket.emit('isUserTyping', {
        state: true,
        recipientId
      })
    }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      socket.emit('isUserTyping', {
        state: false,
        recipientId
      })
    }, 3000)
  }, [socket, currentChat, user, isTyping])

  //mark a notification when a chat is open
  const markThisNotificationAsRead = useCallback(
    (thisUserNotifications, notifications) => {
      const markedNotifications = notifications.map(el => {
        let notification
        thisUserNotifications.forEach(n => {
             if (n?.senderId === el?.senderId) {
            notification = {
              isRead: true,
              ...n
            }
          } else {
            notification = el
          }
        })
        return notification
      })
      setNotifications(markedNotifications)
    },
    []
  )

  //debug area
  console.log('messages :', messages)
  return (
    <ChatContext.Provider
      value={{
        userChats,
        creatChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        setTextMessage,
        textMessage,
        sendTextMessage,
        clearChat,
        clearedChats,
        toggleRecipientProfile,
        setToggleRecipientProfile,
        openModal,
        setOpenModal,
        allUsers,
        deleteMultipleMessages,
        setMessages,
        onlineUsers,
        isUserChatsLoading,
        disConnectUser,
        handleTyping,
        isTyping,
        setIsTyping,
        notifications,
        markThisNotificationAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
