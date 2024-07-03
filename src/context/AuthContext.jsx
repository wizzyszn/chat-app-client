import { toast } from "react-toastify";
import { baseUrl, getRequest, postRequest } from "../utils/services";


const { createContext, useEffect, useState, useCallback,  } = require("react");

export const AuthContext = createContext();
export const AuthContextProvider =({children}) =>{
    const [user, setUser] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const [logoutError, setLogoutError] = useState(null);
    const [logoutMessage, setLogoutMessage] = useState(null);
    const [registerInfo,setRegisterInfo] = useState({
        username : '',
        email : '',
        password : '',
        firstName : '',
        lastName : ''
    });
    const [loginInfo, setLoginInfo] = useState({
        email : "",
        password : "",
    });

    //when component first mounts fetch the user if it is available
    useEffect(() =>{
        const user = localStorage.getItem("user");
        setUser(JSON.parse(user));
    }, []); 
    //register user function
    const registerUser = useCallback( async () =>{
        setIsRegisterLoading(true);
        const response =await  postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        if(response.error){
            console.log(response.error)
            setIsRegisterLoading(false)
            return toast.error(response.message);

        }
        setIsRegisterLoading(false);
        setUser(response)
        localStorage.setItem("user", JSON.stringify(response) )
        return response.status
    }, [registerInfo])
    //login user function
    const loginUser = useCallback( async () =>{
        try{
            setIsLoginLoading(true);
        const response =await  postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        if(response.error){
            setIsLoginLoading(false);
        throw new Error(response.message)
        }
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response) )
        setIsLoginLoading(false)
        return response.status
            
        }catch(err){
            toast.error(err.message)
            setIsLoginLoading(false)
        }
        
    }, [loginInfo]);
    //logout user function
    const logoutUser = useCallback(async() =>{
        try{
            setIsLogoutLoading(true);
            const response = await getRequest(`${baseUrl}/users/logout`);
            if(response.error) throw new Error("Unable to signout try again later");
            setLogoutMessage(response?.message);
               setLogoutError(null)
                localStorage.removeItem('user');
         return true;
        }catch(err){
            setLogoutError(err.message);
            return false
        }
     
    }, [])  
    //debug areas
    console.log("current user : ", user)
      return <AuthContext.Provider value={{
        user,
        isLoginLoading,
        isRegisterLoading,
        registerInfo,
        loginInfo,
        registerUser,
        loginUser,
        setLoginInfo,
        setRegisterInfo,
        logoutUser,
        isLogoutLoading,
        logoutError,
        logoutMessage,
        setIsLogoutLoading
    }}>
        {children}
    </AuthContext.Provider>
}