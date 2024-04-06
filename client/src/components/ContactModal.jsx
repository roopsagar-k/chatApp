import { useState } from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ContactModal = ({ showFormModal, setShowFormModal }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/addContact", { name, phone });
      if(response.status === 200) setShowFormModal(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
      <Modal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >  
      <Box sx={style} className="bg-gray-200 md:w-1/3">
        <h1 className="text-lg font-bold">Add Contact</h1>
        <p className="text-sm font-medium mt-2">Complete the fields below to add a new contact.</p>
        <form onSubmit={handleSubmit}>
          <div className="border-[2px] border-black rounded my-2 p-3 flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              type="text" 
              placeholder="John Doe" 
              id="name" 
              className="formInput w-full rounded border-[1px] border-black" 
              required/>

            <label htmlFor="phone">Phone Number</label>
            <input 
              onChange={(e) => setPhone(e.target.value)} 
              value={phone || ''} 
              type="tel" 
              placeholder="+91 1234567890" 
              id="phone" 
              className="formInput w-full rounded border-[1px] border-black" 
              required/>
          </div>
        <div className="w-full h-max m-2 flex justify-end px-2 gap-2">
            <button onClick={() => setShowFormModal(false)} type="button" className="rounded border-[2px] px-2 py-1 bg-gray-100 border-sky-500 text-sm">Cancel</button>
            <button type="submit" className="gradient rounded border-[2px] px-2 pt-1 bg-sky-500 text-white border-sky-500 text-sm">Add Contact</button>
        </div>
        </form>
      </Box>
    </Modal>
  )
}

export default ContactModal;
