import React, { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';


const Chats = ({isPersonalChat, setIsPersonalChat}) => {
  const [chats, setChats] = useState([
    {
      name: "Andria",
    },
    {
      name: "Robert"
    }, 
    {
      name: "Sundar"
    },
    {
      name: "Emma Watson"
    },
    {
      name: "Andria",
    },
    {
      name: "Robert"
    }, 
    {
      name: "Sundar"
    },
    {
      name: "Emma Watson"
    }
  ]);
  return (
    <div className="relative h-screen border-[2px] border-t-0">
      <div className="w-full h-14 flex items-center justify-center py-2 border-b-[2px]">
        <div>
            <Button onClick={() => setIsPersonalChat(true)} variant={isPersonalChat ? "outlined" : "" }>Personal</Button>
            <Button onClick={() => setIsPersonalChat(false)} variant={isPersonalChat ? "" : "outlined" }>Groups</Button>
        </div>
      </div>
      <List className="h-[70vh] overflow-x-hidden overflow-y-auto w-full relative">
        {chats.map((chat, index) => (
          <React.Fragment key={index}>
          <ListItem alignItems="flex-start" className="cursor-pointer hover:bg-gray-200">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" sx={{ width: 36, height: 36 }} />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                className="font-semibold"
                component="span"
                variant="body2"
                color="text.primary"
              >
                {chat.name}
              </Typography>
              <p className="text-gray-500 truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero aperiam sit sequi dolorem molestiae est quia maiores. Dolores, velit?</p>
            </ListItemText>
          </ListItem>
          <hr />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

export default Chats
