import Modal from '@mui/material/Modal';
import { useEffect } from 'react';

export default function ImgReview({setopenIMG,openIMG,img,IsPhotoProfile}) {

  const handleClose = () => {
    setopenIMG(false);
  };




  return (
    <>

      <Modal 
        open={openIMG}
        onClose={handleClose}
      sx={{alignItems:"center",backdropFilter:"blur(15px)",background:"rgba(0, 0, 0, 0.47)",justifyContent:"center",display:"flex"}}
      >
        <img
          style={{ borderRadius: IsPhotoProfile ? "50%" : "10px", maxWidth: "80%",maxHeight:"80vh",outline:"none" ,border:"none"}}
          src={img}
          alt="preview"
        />
      </Modal>
    </>
  );
}