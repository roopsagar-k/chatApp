import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Toast from "../components/Toast";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const isTabView = useMediaQuery({ query: '(min-width: 1025px)' });
  console.log(isTabView);
  return (
    <div className="w-full h-screen bg-sky-300">
    <Container>
      {showToast && (
         <Toast toastType={toastType}>
           {toastMessage}
         </Toast>
       )}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] grid lg:grid-cols-2 rounded-lg overflow-hidden shadow-lg">
            {isTabView &&
              <div className="bg-sky-500" >
                <img src="/doodleImages-removebg-preview.png" className="object-fit h-full w-full"/>
              </div>}
          <div className="flex flex-col text-center item-center justify-center shrink-0 bg-white">
            {!isTabView && <img src="/doodleImages-removebg-preview.png" className="object-fill bg-sky-500 blur-sm h-full w-full absolute"/>}
            <Typography className={`gradient z-10 bg-clip-text text-transparent ${!isTabView ? "text-white font-extrabold" : ""}`} variant="h5">{isLogin? "LOGIN HERE": "REGISTER HERE"}</Typography>
            {isLogin && <Signin setToastType={setToastType} setIsLogin={setIsLogin} setShowToast={setShowToast} setToastMessage={setToastMessage} isTabView={isTabView} />}
            {!isLogin && <Signup setIsLogin={setIsLogin} setShowToast={setShowToast} setToastMessage={setToastMessage} isTabView={isTabView} />}     
          </div>
       </div>
    </Container>
    </div>
  )
}

export default AuthPage;

