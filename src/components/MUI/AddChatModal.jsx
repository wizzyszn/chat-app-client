import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { IoMdAdd } from "react-icons/io";
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: '#002047',
  boxShadow: 24,
  p: 4,
  height: '50%',
  color: 'white',
  overflow : "auto"
};

export default function BasicModal() {
  const { openModal, setOpenModal, allUsers,creatChat,userChats } = React.useContext(ChatContext);
  const {user} = React.useContext(AuthContext);
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleClick =(otherUser,user) =>{
   const check = userChats.find((userChat) =>{
      const check = userChat.members.includes(otherUser);
      console.log(check)
      return check;
    })
    if(!check){
      return creatChat(otherUser,user)
    }
    else{
      return false;
    }    
  }
  console.log("user chats in modal:",userChats);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Contacts
          </Typography>
          {allUsers.map((recipientUser, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2, gap :2, border : '1px solid #001329', padding: '10px',    '&:hover': {
                backgroundColor: '#003366', // Darker shade of the background color on hover
                cursor: 'pointer',
              }, }}
              onClick ={() => {handleClick(recipientUser?._id,user?._id)?toast.success(`Added  ${recipientUser.firstName}`) : toast.error(`Chat with ${recipientUser.firstName} already exists`)}}
              >
              <div className=' size-12 rounded-full overflow-auto'><img src={recipientUser?.avatar} alt="avi" className=' w-full h-full object-cover' /></div>
              <Typography
                id="modal-modal-description"
                sx={{
                  padding: '2px',
                  flexGrow: 1,
                }}
              >
                {recipientUser?.lastName + ' ' + recipientUser?.firstName}
              </Typography>
              <IoMdAdd />
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
