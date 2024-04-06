import { useContext, useEffect, useState } from "react";
import ContactModal from "./ContactModal";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import { SelectedContactContext } from "../SelectedContactContext";

const ContactList = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const {selectedContact, setSelectedContact} = useContext(SelectedContactContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/contacts");
        if(response.status === 200) {
          setContacts(response.data.contacts);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchContacts();
  }, []);

  const handleSelectedContact = (tel) => {
    setSelectedContact(tel);
  }
  
  return (
    <>
      <div className="w-full h-screen border-[2px] border-t-0">
        <div onClick={() => setShowFormModal(true) } className="h-14 w-full border-b-[2px] cursor-pointer hover:bg-gray-200 font-bold text-gray-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1976d2" className="w-10 h-10 mx-2 bg-gray-200 rounded-full p-2 pr-1">
            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
          </svg>
          <p>New Contact</p>
        </div>
        <List className="h-[70vh] overflow-x-hidden overflow-y-auto w-full relative">
        {contacts.length > 0 ? (
          contacts.map((contact, index) => {
            return(
              <div key={index}>
                <ListItem onClick={() => setSelectedContact(() => handleSelectedContact(contact.tel))} className={`hover:bg-gray-200 cursor-pointer ${selectedContact?.id === contact?._id ? 'bg-gray-200' : ''}`} >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" sx={{ width: 36, height: 36 }} />                
                  </ListItemAvatar>
                  <p className="font-semibold">{contact.name}</p>
                </ListItem>
                <Divider />
              </div>
            )})
        ) : <p>No contacts found</p>}
        </List>
      </div>
      {showFormModal && <ContactModal showFormModal={showFormModal} setShowFormModal={setShowFormModal} />};
    </>
  )
}

export default ContactList
