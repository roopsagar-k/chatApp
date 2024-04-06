import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { UserContext } from "../UserContext";
import Avatar from "@mui/material/Avatar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ChatIcon from '@mui/icons-material/Chat';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useState } from "react";
import Container from '@mui/material/Container';
import Chats from "./Chats";
import ContactList from "./ContactList";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const Contacts = () => {
    const { user } = useContext(UserContext);
    const [active, setActive] = useState(0);
    const [isPersonalChat, setIsPersonalChat] = useState(true);
    const Navigate = useNavigate();    
    if(!user) return (
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const handleChange = (event, newValue) => {
      console.log(newValue);
      setActive(newValue);
    };
  return (
    <div className="w-[25%] relative bg-gray-50 shrink-0">
      <Container className="w-full h-16 flex justify-between items-center px-2 border-[2px] rounded">
        <div onClick={() => Navigate("/profile")} className="flex items-center gap-2 font-semibold cursor-pointer max-w-[50%] truncate">
          <Avatar alt="Remy Sharp" sx={{ width: 36, height: 36 }} />
          <p>{user.name}</p>
        </div>
        <div className="flex gap-3 mx-3">
            <CiSearch className="cursor-pointer" size={'23px'} fill={"#83818c"} />
            <BsThreeDots className="cursor-pointer" fill={"#83818c"} size={'23px'} />
        </div>
      </Container>
      <Tabs value={active} onChange={handleChange} sx={{ width: "100%" }} className="border-[2px] border-t-0"  aria-label="icon tabs example">
        <Tab sx={{ width: "50%" }} icon={<ChatIcon />} aria-label="favorite" />
        <Tab sx={{ width: "50%" }} icon={<PersonPinIcon />} aria-label="person" />
      </Tabs>
        {active === 0 && (
          <Chats isPersonalChat={isPersonalChat} setIsPersonalChat={setIsPersonalChat} />
        )}
        {active === 1 && (
          <ContactList />
        )}
    </div>
  )
}

export default Contacts
