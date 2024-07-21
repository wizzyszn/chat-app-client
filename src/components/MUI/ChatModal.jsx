import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ChatProfile from '../ChatProfile';
import { ChatContext } from '../../context/ChatContext';
import ChatSection2 from '../ChatSection2';
import ChatProfile2 from '../ChatProfile2';

const style = {
  position: 'absolute',
  width: "100%",
  bgcolor: '#002047',
  border: '2px solid #000',
  boxShadow: 24,
};

function ChildModal({setOpenProfileModal,openProfileModal}) {
  const handleClose = () => {
    setOpenProfileModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={openProfileModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{
            display : 'flex',
            justifyContent : "center",
            alignItems : 'center'
        }}
      >
        <Box sx={{ ...style, width: "90%", color : "white"}}>
            <ChatProfile2 />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
    const {setOpenChatModal,openChatModal,setOpenProfileModal,openProfileModal } = React.useContext(ChatContext)
  const handleClose = () => {
    setOpenChatModal(false);
  };

  return (
    <div>
      <Modal
        open={openChatModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "100%",height : "100%",color : 'white', padding : 1 }}>
            <ChatSection2 />
            <ChildModal setOpenProfileModal ={setOpenProfileModal} openProfileModal ={openProfileModal} />
        </Box>
      </Modal>
    </div>
  );
}
