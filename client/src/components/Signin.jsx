import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signin = ({setToastType, setIsLogin, setShowToast, setToastMessage, isTabView}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const {setUser} = useContext(UserContext);
  const Navigate = useNavigate();

  
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/login", {username, password});
      if(result.status === 200) {
        setToastMessage("Login Sucessfull!");
        setUser(result.data.user);
        setToastType("success");
        await triggerAlert();
        setTimeout(() => {
          Navigate("/home");
        }, 4000);
      } else {
        setToastMessage("Login failed!");
        setToastType("error");
        await triggerAlert();
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Login failed!");
      setToastType("error");
      await triggerAlert();
    }
    async function triggerAlert() {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } 
  }

  return (
    <form className="px-12 text-center z-10" onSubmit={loginUser}>
          <TextField 
            value={username}
            id="outlined-basic" 
            className="input"
            label="Username" 
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)} 
            variant="standard"
            required />

          <TextField
            value={password} 
            id="outlined-password-input"
            label="Password"
            type="password"
            className="input"
            placeholder="Enter password"
            name="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            required
         />
        <Button type="submit" className="primary" variant="contained">continue</Button>
        <div className={`p-2 text-center ${!isTabView ? "text-white font-bold" : "text-sky-600"}`}>
            Don&apos;t have an account yet ? <span onClick={() => setIsLogin(false)} className="text-primary underline font-medium cursor-pointer">Register now</span>
        </div>
    </form>
  )
}

export default Signin
