import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup = ({setIsLogin, setShowToast, setToastMessage, isTabView}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(0);
  const [contactExists, setContactExists] = useState(false);
  const Navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/register", {username, password, phone});
      if(result.data.exists) {
        setContactExists(true);
      } else {
        setContactExists(false);
        if(result.status === 200) {
          setToastMessage("Registration Sucessfull!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            Navigate("/profile");
          }, 4000);
        }
    }
    } catch (error) {
      alert("Registration failed!");
      console.error(error);
    }
    
  }
  return (
    <form className="px-12 text-center z-10" onSubmit={registerUser}>
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
        <TextField 
          id="outlined-basic"
          variant="standard"
          onChange={(e) => setPhone(e.target.value)} 
          value={phone} 
          className="input" 
          type="Number" 
          label="Phone"
          placeholder="+91  9988776655" 
          pattern="[0-9]{10}"
          required 
        />
          {contactExists && <p className="text-red-500">Contact already exists!</p>}
        <Button type="submit" className="primary" variant="contained">continue</Button>
        <div className={`p-2 text-center ${!isTabView ? "text-white font-bold" : "text-sky-600"}`}>
            Already have an account, <span onClick={() => setIsLogin(true)} className="text-primary underline font-medium cursor-pointer">Login</span>
        </div>
    </form>
  )
}

export default Signup;

