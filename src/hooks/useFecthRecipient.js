import { useEffect , useState }  from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser  = (chat, userId) =>{
    const [recipientUser , setRecipientUser] = useState(null);
    const [error , setError] = useState(null);
    const [loading, setLoading] = useState(true);
        const recipientId = chat?.members?.find((id) => id !== userId);
        console.log("recipientId : ", recipientId);
    useEffect(() => {
        const getUser = async () =>{
            if(!recipientId) {
                setLoading(false)
                return null;
            }
            try{
                setLoading(true)
                const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
                console.log("response in hook:", response)
                if(response.error){
                    throw new Error(response.message)
                }
                setRecipientUser(response);

            }catch(err){
                setError(err.message)
            }finally {
                setLoading(false);
              }
        }
        getUser();
    } , [recipientId])
    return { recipientUser, loading, error };
    
}   