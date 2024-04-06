import ChatArea from "../components/ChatArea";
import Contacts from "../components/Contacts";
import { Box } from "@mui/material";

const IndexPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Contacts />
      <ChatArea />
    </Box>
  )
}

export default IndexPage;
