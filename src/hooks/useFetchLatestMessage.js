import React, { useContext, useEffect, useState } from 'react'
import { baseUrl, getRequest } from '../utils/services'
import { ChatContext } from '../context/ChatContext';

export default function useFetchLatestMessage(chat) {
   const {newMessage,notifications} = useContext(ChatContext)
    const [latestMessage,setLatestMessage] = useState([]);
    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await getRequest(`${baseUrl}/messages/${chat._id}`);
                if(response.error) throw new Error(response.message)
                const message = response[response.length - 1];
                setLatestMessage(message);
            }catch(err){
                console.log(err.message)
            }
        }
        fetchData();
    
    } ,[chat,newMessage,notifications])
     return latestMessage
}
