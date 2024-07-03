import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import noImage from '../assets/images/vecteezy_illustration-of-no-image-available-icon-template-for-no_8015799.jpg';
import { AuthContext } from '../context/AuthContext';
import BlockWaves from '../components/svg/BlockWaves'
import { baseUrl, postRequest } from '../utils/services';
import { ref,  getDownloadURL , uploadBytesResumable} from 'firebase/storage'
import storage from '../firebase';
export default function SetAvatar() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(false);
  const [message,setMessage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile,setImageFile] = useState(null)
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  const handleSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(url);
      setImageFile(e.target.files[0])
    } 
  };
  
   async function fetchData(downloadURL){
    try{
      const response = await postRequest(`${baseUrl}/users/set-avatar`, JSON.stringify({imageUrl : downloadURL, _id: user?._id}));
      if(response.error){
        throw new Error(response.message);
      }
      setMessage(response.message);
      setErrorMessage(null)
    }catch(err){
      setErrorMessage(err.message);
      setMessage(null)
   
    }finally{
      setIsLoading(false);
    }
  
   }
   const handleUpload = () => {
    if (!selectedImage || !user?.firstName) return;
    setIsLoading(true); // Start loading before the upload begins
    const storageRef = ref(storage, `${user?.firstName}/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setErrorMessage("Upload failed", error);
        setIsLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          fetchData(downloadURL);
        }).catch((error) => {
          console.error("Failed to get download URL", error);
          setErrorMessage("Failed to get download URL");
          setIsLoading(false); // Stop loading if getting the URL fails
        });
      }
    );
  };
  //debug area
  return user && (
    <div className='h-svh flex items-center text-black flex-col p-[5%] border-2'>
      {
        message && ( <p className=' text-sm text-green-500 font-semibold'>{message}</p>)
      }
      {
        errorMessage && ( <p className=' text-sm text-red-500 font-semibold'>{errorMessage}</p>)
      }
     
      <div className='flex flex-col gap-4 shadow-md border w-[50%] h-[80%] p-3 shad relative'>
        <h1 className='text-4xl text-center'>Set Profile Picture</h1>
        <p className='text-center text-[#333333] font-medium'>{user.user?.firstName}</p>
        <p className='text-center text-sm'>Please set your profile picture</p>
        <div className='flex flex-col gap-4 items-center'>
          <div className='relative w-60 h-60 rounded-full overflow-hidden border-2 border-black'>
            {
              isLoading && <BlockWaves />
              }
              <img
                src={selectedImage ? selectedImage : noImage}
                alt='selected'
                className={`w-full h-full object-cover ${isLoading &&  "  opacity-30"}`}
              /> 
           
          </div>
          <div className=' flex flex-col mt-6'>
          <button
            className='p-3 w-fit rounded-md bg-black text-white'
            disabled={isLoading} // Disable button during loading
            onClick={() => {
              document.getElementById('image').click();
            }}
          >
            {isLoading ? `Uploading ${uploadProgress}%` : "Select Photo"}
          </button>
          <button
            className='p-3 w-fit  text-black font-medium text-sm hover:underline'
            onClick={() => {
              setSelectedImage(null);
            }}
          >
            Remove Photo
          </button>
          <input
            type='file'
            name='image'
            id='image'
            accept='image/*'
            onChange={handleSelect}
            className='hidden'
          />

          </div>
         
         
        </div>
        <button
        disabled= {isLoading}
          onClick={() => {
            handleUpload();
            setTimeout(() =>{
              navigate('/chat')
            }, 5000)
          }}
          className={`bg-black text-white w-[20%] p-2 rounded-md absolute bottom-6 right-7 ${isLoading && " opacity-85 cursor-not-allowed"} `}
        >
          save & continue
        </button>
      </div>
    </div>
  );
}
