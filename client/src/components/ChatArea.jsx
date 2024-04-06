import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { SelectedContactContext } from "../SelectedContactContext";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";

const ChatArea = () => {
    const { selectedContact } = useContext(SelectedContactContext);
    const [contact, setContact] = useState(null);
    console.log(selectedContact);
     useEffect(() => {
        axios.get(`/contacts/${selectedContact}`).then(response => {
             if(response.status === 200) {
                setContact(response.data);
            } else {
                console.error("Error fetching contact!");
            }
        }).catch(error => {
            console.error(error);
        });
     }, []);

    return (
    <Box className={"w-full rounded bg-gray-50 h-screen"}>
        {selectedContact  !== 0  ? (
            <Box className='w-[67%] border-[2px] h-full relative'>
                <div className="w-full h-16 rounded px-3 border-b-[2px] flex items-center justify-between">
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" sx={{ width: 36, height: 36 }} />
                        <p>{contact?.name}</p>
                    </Stack>
                    <p>yo</p>
                </div>
                <div className="absolute bottom-0 w-full py-3 px-2 bg-gray-200">
                    <Stack direction="row" spacing={2}>
                        <TextField
                            multiline
                            maxRows={3}
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Type a message..."
                            className="bg-white rounded"
                        />
                        <Button 
                            variant="contained"
                            className="bg-primary text-white" 
                            size="medium"
                            disabled={false}
                            endIcon={<SendIcon />}>
                          Send
                        </Button>
                    </Stack>
                </div>
            </Box>
        ) : (
            <div className="flex flex-col items-center justify-center w-full bg-gray-100 h-screen">
                <h2 className="text-3xl font-medium text-primary">Welcome to our chat!</h2>
                <p>No contact selected yet. Please select a contact from the list to start a conversation.</p>
            </div>
        )}
    </Box>
  )
}

export default ChatArea
